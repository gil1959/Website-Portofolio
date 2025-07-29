// app/api/likes/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Like from '@/models/Like'

export async function GET() {
    await connectToDatabase()

    // Ambil atau buat satu dokumen global
    let doc = await Like.findOne()
    if (!doc) {
        doc = await Like.create({ likes: 0, dislikes: 0 })
    }

    return NextResponse.json({
        likes: doc.likes,
        dislikes: doc.dislikes,
    })
}

export async function POST(req: Request) {
    await connectToDatabase()
    const { vote } = await req.json()

    if (vote !== 'like' && vote !== 'dislike') {
        return NextResponse.json(
            { error: 'Invalid vote type' },
            { status: 400 }
        )
    }

    let doc = await Like.findOne()
    if (!doc) {
        doc = await Like.create({ likes: 0, dislikes: 0 })
    }

    if (vote === 'like') doc.likes += 1
    else doc.dislikes += 1

    await doc.save()

    return NextResponse.json({
        likes: doc.likes,
        dislikes: doc.dislikes,
    })
}
