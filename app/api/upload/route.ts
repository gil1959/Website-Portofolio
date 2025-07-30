// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export const runtime = "nodejs";

// Cloudinary otomatis membaca CLOUDINARY_URL dari env
// Contoh di .env.local:
// CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
cloudinary.config({ secure: true });

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // File -> ArrayBuffer -> Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload ke Cloudinary via upload_stream
        const uploadResult: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "portfolio" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            Readable.from(buffer).pipe(uploadStream);
        });

        // Kembalikan URL gambar yang baru di‑upload
        return NextResponse.json({ url: uploadResult.secure_url });
    } catch (err: any) {
        console.error("ERROR /api/upload:", err);
        return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
    }
}
