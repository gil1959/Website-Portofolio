// models/Education.ts
import { Schema, models, model } from 'mongoose';

const EducationSchema = new Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },                   // null = ongoing
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export const Education =
    models.Education || model('Education', EducationSchema);
