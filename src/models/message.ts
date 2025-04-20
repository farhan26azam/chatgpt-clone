import mongoose, { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  role: String,
  content: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = models.Message || model('Message', MessageSchema);
