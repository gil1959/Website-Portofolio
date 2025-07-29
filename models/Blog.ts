// /models/Blog.ts
import mongoose, { Document } from 'mongoose'

export interface IBlog extends Document {
    title: string
    slug: string
    excerpt: string
    content: string
    image?: string
    category: string
    readTime: string
    date: Date
    tags: string[]
}

const BlogSchema = new mongoose.Schema<IBlog>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String },
        category: { type: String, required: true, enum: ['Development', 'Best Practices', 'CSS', 'TypeScript', 'React', 'Architecture'] },
        readTime: { type: String, required: true },
        date: { type: Date, required: true },
        tags: { type: [String], default: [] },
    },
    { timestamps: true }
)

export default mongoose.models.Blog ||
    mongoose.model<IBlog>('Blog', BlogSchema)
