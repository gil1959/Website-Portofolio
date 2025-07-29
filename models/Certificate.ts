// models/Certificate.ts
import mongoose from 'mongoose'

const CertificateSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        issueDate: { type: String, required: true }, // tahun atau tanggal
        description: { type: String },
        credentialId: { type: String },
        skills: { type: [String], default: [] },
        verifyUrl: { type: String },
        image: { type: String }, // jika mau tampilkan gambar sertifikat
    },
    { timestamps: true }
)

export default mongoose.models.Certificate ||
    mongoose.model('Certificate', CertificateSchema)
