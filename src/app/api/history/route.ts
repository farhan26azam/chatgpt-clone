import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Message } from '@/models/message';

export async function GET() {
  await connectToDB();

  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(50); // latest 50
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 });
  }
}
