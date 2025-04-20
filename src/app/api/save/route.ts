import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Message } from '@/models/message';

export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const body = await req.json();
    const saved = await Message.create(body);
    return NextResponse.json({ success: true, saved });
  } catch (err) {
    console.error('MongoDB save error:', err);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
