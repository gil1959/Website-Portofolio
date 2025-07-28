// models/Blog.ts
import { Schema, models, model } from 'mongoose';

const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Blog = models.Blog || model('Blog', BlogSchema);
