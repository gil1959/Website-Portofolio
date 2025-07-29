// models/Experience.ts
import mongoose from 'mongoose'

const ExperienceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        period: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
            required: true,
        },
        description: {
            type: String,
        },
        achievements: {
            type: [String],
            default: [],
        },
        technologies: {
            type: [String],
            default: [],
        },
        website: {
            type: String,
        },
    },
    { timestamps: true }
)

export default mongoose.models.Experience ||
    mongoose.model('Experience', ExperienceSchema)
