import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'chatgpt_clone',
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
