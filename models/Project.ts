// models/Project.ts
import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        url: { type: String, required: true },
        image: { type: String },
        category: {
            type: String,
            enum: ['website', 'ml', 'academic'],
            default: 'website',
        },
        githubUrl: { type: String },
        liveUrl: { type: String },
        featured: { type: Boolean, default: false },        // ← sudah ada
        status: {
            type: String,
            enum: ['completed', 'in-progress', 'planned'],
            default: 'planned',                                  // ← sudah ada
        },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export default mongoose.models.Project ||
    mongoose.model('Project', ProjectSchema)
