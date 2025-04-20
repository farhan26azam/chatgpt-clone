import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { connectToDB } from '@/lib/mongodb';
import { Message } from '@/models/message';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  await connectToDB();

  // Save user message to MongoDB
  try {
    if (lastMessage.role === 'user') {
      await Message.create(lastMessage);
    }
  } catch (error) {
    console.error('Failed to save user message:', error);
  }

  const lastUserContent = lastMessage?.content?.toLowerCase();

  // 🎨 Image generation trigger
  if (lastUserContent.includes('generate an image')) {
    const imageResponse = await openai.images.generate({
      prompt: lastUserContent,
      n: 1,
      size: '512x512',
    });

    const imageUrl = imageResponse.data[0].url;

    const reply = {
      role: 'assistant',
      content: 'Here is your image:',
      imageUrl,
    };

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 🧠 Text streaming response
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
