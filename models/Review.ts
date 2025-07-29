import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
    name: string;
    role: string;
    company: string;
    text: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        company: { type: String, required: true },
        text: { type: String, required: true },
        avatar: { type: String },
    },
    { timestamps: true }
);

// **Hapus model lama** jika ter‑register (bypass HMR cache)
if (mongoose.models.Review) {
    delete mongoose.models.Review;
}

// Daftarkan ulang model
const Review: Model<IReview> =
    mongoose.models.Review ||
    mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
