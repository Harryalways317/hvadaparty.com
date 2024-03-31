---
title: Finetuning LLM's, Why?
slug: finetuning-llms
datetime: 2024-04-01T12:35:01.255Z
draft: false
type: post
tags:
  - LLM
  - GenAI
  - finetuning

ogImage: ""
---

# LLMs and Need of Finetuning
Alright, let’s talk big language models (LLMs) – they're everywhere, and it's like a new one pops up every day. After everyone started sharing these LLMs like hotcakes, places like Hugging Face are getting flooded with a thousand new models daily. But why the fuss about finetuning?

So here's the deal: models like Mistral, LLaMA, Open Hermes, or even GPT, they're smart but kind of generalists. They know a bit of everything, which is cool, but sometimes you need an expert, right? Imagine you're building a bot to crank out code or maybe a chatbot that knows health stuff inside and out. You want it to chat in a certain way, focusing on what matters for your project. That's where finetuning jumps in. It's like custom tailoring for your AI – making sure it gets your vibe and talks right for your audience.

# Finetuning: The What and How

Large language model (LLM) fine-tuning is the process of taking pre-trained models like Mistral/Open Hermes, even GPT  and further training them on smaller, specific datasets to refine their capabilities and improve performance in a particular task or domain. Fine-tuning is about turning general-purpose models and turning them into specialized models. It bridges the gap between generic pre-trained models and the unique requirements of specific applications, ensuring that the language model aligns closely with human expectations

Finetuning is not just one thing; it’s got flavors – LoRA, QLoRA, and the newbie, DORA. It's all about tweaking those model knobs to get the perfect response style, knowledge level, you name it.

But here’s the kicker: finetuning is a beast. It chews up a ton of memory and needs some serious computing muscle. Not exactly something you can run on your old laptop.But few tools and dataset size plays a key role, lets say i finetuned my own Zephyr Model with System Chat Dataset on Colab t4 in around 25 mins, yes thats all it took as its small dataset

# Basic Types of Finetuning

1. **Using System Prompt**:
   - **What It Is**: This is like giving the AI a cheat sheet before a test. You don't change the AI itself; you just get better at asking questions or giving it prompts that guide it towards the kind of answers you want.
   - **Essence**: It’s the quick and easy hack. No need to mess around with the model’s brain; you just need to know how to ask the right questions.

2. **Using Supervised Fine-Tuning**:
   - **What It Is**: Here, you're teaching the AI using a dataset where you already know the answers (labels). It's like a teacher grading a test; the AI learns from its mistakes and successes.
   - **Essence**: The traditional classroom setting. The AI learns from examples and gets feedback on its performance. It's more work but leads to a smarter, more specialized AI.

3. **Using Reinforcement Learning from Human Feedback (RLHF)**:
   - **What It Is**: This method involves the AI trying out different responses, and humans give it a thumbs up or thumbs down. Think of it as training a pet with treats and scolds.
   - **Essence**: It’s more interactive and dynamic. The AI learns what’s good and bad based on real-time feedback, kinda like learning to cook with a chef over your shoulder.

4. **Using Transfer Learning**:
   - **What It Is**: You start with an AI that's already been trained on a bunch of data, then you fine-tune it with your specific dataset. It's like an experienced doctor specializing in a new area.
   - **Essence**: The experienced professional taking a short course to skill up. It’s efficient because you're building on what the AI already knows.

5. **Using Few-Shot Learning**:
   - **What It Is**: This is teaching the AI by showing it just a few examples of what you want. It’s like showing someone a few pictures of a style and then asking them to dress that way.
   - **Essence**: The minimalist approach. You’re making the AI clever at figuring things out with very little to go on, which is pretty neat but can be hit or miss.

6. **Using Task-Specific Fine-Tuning**:
   - **What It Is**: This is all about laser-focusing the AI on a specific task with a dataset designed just for that. Imagine training a musician to play one song perfectly.
   - **Essence**: The specialist. Instead of being a jack-of-all-trades, the AI becomes a master of one, knowing all the ins and outs of a particular task.


# What we actually need (PEFT and what we do now)

PEFT (Parameter-Efficient Fine-Tuning) is like giving your LLM a quick, targeted brain surgery, focusing on tweaking just a few bits instead of the whole thing. It's all about being smart with your resources, making your model sharper in certain areas without the need for a supercomputer.

### The Trio: LoRA, QLoRA, and DORA

**LoRA** is your efficiency guru, adding a little extra to the model's attention layers without the heavy lifting. It’s like slipping in a cheat sheet rather than re-studying the entire course. (Simply in my words, fine-tuning the engine of a car without rebuilding from scratch )

**QLoRA** takes LoRA’s approach and turns the dial up on efficiency by using the digital equivalent of shorthand notes. Imagine compressing your cheat sheet even further so it fits in your pocket.

**DORA** is the dynamic one in the group, adjusting the cheat sheet's size based on what the exam might throw at you. It’s like having a smart, adaptable tool that knows when to give more detail or when to keep it simple.

### What to Tweak

### LoRA: Precision Without Pressure
- **Ideal For**: Projects needing nuanced improvements without overhauling the model. LoRA is perfect when you're fine-tuning attention mechanisms for tasks like nuanced language understanding or subtle style shifts in generation.
- **Best Choice When**: You have a decent amount of computing resources and a clear focus area. It’s for when you need that precise adjustment without the computational cost of a full model retraining.

### QLoRA: Efficiency,Efficiency,Efficiency with Effectiveness
- **Ideal For**: Scenarios where memory and computational efficiency are as critical as performance. QLoRA shines in mobile or edge computing applications where you're deploying LLMs but are constrained by hardware.
- **Best Choice When**: Every bit of computational savings counts. It’s for projects where deploying a lean, yet effective model can make or break the application, especially in real-time or on-device scenarios.

### DORA: One Word - Flexible
- **Ideal For**: Projects with dynamic requirements or those that involve a wide range of tasks. DORA adapts its tuning based on what the task demands, offering a more versatile approach.
- **Best Choice When**: You’re not entirely sure of the range or complexity of tasks the model will face. DORA’s flexibility makes it suitable for applications where the model needs to juggle multiple types of requests or content.

When diving into PEFT and its clever methods, here’s your game plan:

1. **Zero in on the Task**: Sharp focus is key. For tasks requiring deep domain knowledge, LoRA might be your ally. For broader, more varied tasks, DORA could offer the adaptability you need.

2. **Pick Your Battles**: Concentrate on crucial model parts. Attention mechanisms? LoRA and DORA are your friends. Working under hardware constraints? QLoRA’s your best bet.

3. **Watch Your Wallet**: Match your method to your resources. LoRA and QLoRA are great for constrained setups, with QLoRA being the top pick for ultra-efficiency. DORA suits when computational flexibility can be leveraged.

4. **Define Victory**: Clear goals guide your choice. For precision and efficiency, LoRA and QLoRA shine. For adaptability and broad application, turn to DORA.




# Finetuning vs RAG

**Fine-Tuning** fine-tunes pre-trained LLMs with task-specific data, embedding deep domain knowledge directly into the model. It's ideal for achieving high precision in specialized areas like legal analysis or medical diagnosis. Tools like TensorFlow and PyTorch facilitate this process. The main advantage is creating highly specialized models, but it requires a specific dataset and is resource-intensive.

**RAG** combines pre-trained LLMs with a retrieval mechanism, pulling information from external databases to enrich responses. This method suits applications needing broad, current information across various domains. Hugging Face's library supports RAG implementations, offering flexibility and access to vast external knowledge. However, it relies heavily on the quality of external databases and involves integration challenges.

**Key Differences**:
- Fine-Tuning embeds knowledge; RAG accesses it on-demand.
- Fine-Tuning excels in depth within specific domains; RAG offers breadth and up-to-date info.
- Fine-Tuning is resource-heavy; RAG requires maintaining a quality database.

See the below for a clear understanding

<div align="center">
  <div style="width: 45%; display: inline-block; text-align: center; margin-right: 10px;">
    <img src="https://media.licdn.com/dms/image/D5612AQEaLxSmNlyuRw/article-cover_image-shrink_720_1280/0/1698034765964?e=2147483647&v=beta&t=UulgBxg7xMuLUpKPuc_N6tPeFk6Z3h-wjFfaR9lpiWA" alt="Finetuning VS Rag" style="width: 100%;">
    <p>Finetuning VS Rag</p>
  </div>
  <div style="width: 45%; display: inline-block; text-align: center; margin-left: 10px;">
    <img src="https://miro.medium.com/v2/resize:fit:2000/1*kwJjmEEAp8iYVNIQuq94Fw.png" alt="Differences" style="width: 100%;">
    <p>Venn</p>
  </div>
</div>


## We are here only for finetuning just go with that

So, Enough drama, before moving to the real part we need the data, yes DATA!, lets prepare the dataset and also check the ways of preparing that