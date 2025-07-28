// models/Like.ts
import { Schema, models, model } from 'mongoose';

const LikeSchema = new Schema({
    project: { type: String, required: true },
    isLike: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Like = models.Like || model('Like', LikeSchema);
