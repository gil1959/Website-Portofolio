// models/Like.ts
import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema(
    {
        targetId: { type: String, required: true, unique: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
    },
    { timestamps: true }
)

export default mongoose.models.Like || mongoose.model('Like', LikeSchema)