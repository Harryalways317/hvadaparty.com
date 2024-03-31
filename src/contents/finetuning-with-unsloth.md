---
title: Finetuning LLM's at 2x speed with UnSloth
slug: finetuning-llm-unsloth
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

# Finetuning vs RAG

**Fine-Tuning** fine-tunes pre-trained LLMs with task-specific data, embedding deep domain knowledge directly into the model. It's ideal for achieving high precision in specialized areas like legal analysis or medical diagnosis. Tools like TensorFlow and PyTorch facilitate this process. The main advantage is creating highly specialized models, but it requires a specific dataset and is resource-intensive.

**RAG** combines pre-trained LLMs with a retrieval mechanism, pulling information from external databases to enrich responses. This method suits applications needing broad, current information across various domains. Hugging Face's library supports RAG implementations, offering flexibility and access to vast external knowledge. However, it relies heavily on the quality of external databases and involves integration challenges.

**Key Differences**:
- Fine-Tuning embeds knowledge; RAG accesses it on-demand.
- Fine-Tuning excels in depth within specific domains; RAG offers breadth and up-to-date info.
- Fine-Tuning is resource-heavy; RAG requires maintaining a quality database.

