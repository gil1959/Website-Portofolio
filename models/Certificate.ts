// models/Certificate.ts
import { Schema, models, model } from 'mongoose';

const CertificateSchema = new Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
    credentialUrl: { type: String },               // link verifikasi
    createdAt: { type: Date, default: Date.now }
});

export const Certificate =
    models.Certificate || model('Certificate', CertificateSchema);
