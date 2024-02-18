---
title: "CDC Postgres"
slug: cdc-postgres
datetime: 2024-02-01T11:43:16.142Z
draft: false
tags:
  - postgresql
  - cdc
  - microservices
ogImage: ""
---

# Change Data Capture (CDC)

## What is CDC?

CDC tracks changes in a database (inserts, updates, deletes) in real time. It's essential for systems that rely on up-to-the-minute data or need to replicate data across multiple systems or even if you want to keep things in sync

### Methods to Implement CDC

- **Database Triggers:** Custom triggers in database log changes to a separate table.
- **Log-Based CDC:** Captures changes from the database's transaction log.
- **Polling-Based CDC:** Regularly checks the database for changes. Not the most efficient but straightforward.
- **ELT/ETL Tools:** Some tools offer CDC as part of their data integration features.
- **Database Replication:** A form of CDC where data is copied to another database.

## When to Use CDC

CDC shines in:
- **Real-Time Analytics:** Keeping data analysis prompt and accurate.
- **Event based systems:** Keeping track of events in real time.Like events based on actions, like do something when user updated his name
- **Data Replication:** Syncing data across systems to ensure consistency.
- **Microservices Architectures:** Maintaining data integrity across services.

### Where we used this mostly

- **Fraud Detection:** Financial transactions are monitored instantly for anomalies, as we have a app wallet that takes care of all the transactions along with third party payment gateway.
- **Inventory Management:** Real-time syncing between online and physical store inventories. as major sales in mastbazaar still happens on store, so we need to implement this to keep track of inventory.

## Ways to Implement CDC

### Database Triggers Example

This is a way we implemented Change Data Capture (CDC) mechanism for tracking changes in stock and price info in our PostgreSQL database

#### Step 1: Create the Audit Table

First, let's create an audit table that will store changes made to the `products` table. This includes stock and price changes among other potential modifications.

```sql
CREATE TABLE product_changes (
    change_id SERIAL PRIMARY KEY,
    operation_type CHAR(1) NOT NULL,
    product_id INT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

#### Step 2: Create the Trigger Function

The trigger function, `audit_products`, captures the before and after states of a row for insert, update, and delete operations, and logs this information to the `product_changes` table.

```sql
CREATE OR REPLACE FUNCTION audit_products()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO product_changes(operation_type, product_id, old_data, new_data)
        VALUES ('D', OLD.id, row_to_json(OLD), NULL);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO product_changes(operation_type, product_id, old_data, new_data)
        VALUES ('U', NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO product_changes(operation_type, product_id, old_data, new_data)
        VALUES ('I', NEW.id, NULL, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

#### Step 3: Create Triggers for Each Operation

Finally, set up triggers on the `products` table to automatically call `audit_products` upon any insert, update, or delete operation. This ensures that any change to a product's stock or price is captured.

```sql
CREATE TRIGGER products_insert AFTER INSERT ON products
FOR EACH ROW EXECUTE FUNCTION audit_products();

CREATE TRIGGER products_update AFTER UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION audit_products();

CREATE TRIGGER products_delete AFTER DELETE ON products
FOR EACH ROW EXECUTE FUNCTION audit_products();
```

In this type of setup, every insert, update, or delete operation on the `products` table will trigger the `audit_products` function, capturing the details of the operation in the `product_changes` audit table. This includes all fields of the `products` table, allowing us to track how stock and price change over time along with any other modifications to product data.

### Polling-Based CDC: A Simple Approach

Polling involves scripting a regular check for new or changed data in the database. It's easy but can be resource-heavy, if not implemented optimally.

Here is a simple approach we used to sync sales orders from one db to other for analytics purposes. this can work on cross db or cross server as well. like you can use it to sync between oracle and postgres or other ones, this script needs to be ran as a cron job or a scheduled task.

#### Step 1: Database Setup

First, create or modify a table to store the last sync timestamp. This table will hold a single record indicating the last time the sync was successfully completed.

```sql
CREATE TABLE sync_log (
    id SERIAL PRIMARY KEY,
    last_synced_at TIMESTAMP NOT NULL
);

-- Initialize with a far past date if no record exists
INSERT INTO sync_log (last_synced_at) VALUES ('1970-01-01 00:00:00');
```

#### Step 2: Python Script for Syncing Sales Data

This script fetches the last sync timestamp from the `sync_log` table, uses it to fetch new or updated sales records, processes them, and then updates the `sync_log` with the current timestamp.

```python
import psycopg2
import psycopg2.extras
from datetime import datetime

def get_last_synced_at(cursor):
    cursor.execute("SELECT last_synced_at FROM sync_log ORDER BY id DESC LIMIT 1;")
    return cursor.fetchone()[0]

def update_last_synced_at(cursor, timestamp):
    cursor.execute("UPDATE sync_log SET last_synced_at = %s WHERE id = 1;", (timestamp,))

def fetch_new_sales(cursor, last_synced_at):
    query = """
    SELECT * FROM sales
    WHERE last_modified > %s
    ORDER BY last_modified ASC;
    """
    cursor.execute(query, (last_synced_at,))
    return cursor.fetchall()

def main():
    conn = psycopg2.connect(dbname="sales_db", user="db_user", password="db_pass", host="db_host")
    cursor = conn.cursor()

    try:
        last_synced_at = get_last_synced_at(cursor)
        print(f"Last synced at: {last_synced_at}")

        new_sales = fetch_new_sales(cursor, last_synced_at)
        for sale in new_sales:
            # Process each sale here (e.g., sync to another system)
            print(f"Syncing new sale: {sale}")

        if new_sales:
            # Update the last_synced_at to the timestamp of the last sale processed
            update_last_synced_at(cursor, new_sales[-1]['last_modified'])
            conn.commit()
            print("Sync completed successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    main()
```

We can ensure minimal data transfer and also do the needed transformations before syncing the data to the other db.