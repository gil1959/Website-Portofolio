// models/Review.ts
import { Schema, models, model } from 'mongoose';

const ReviewSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Review = models.Review || model('Review', ReviewSchema);
