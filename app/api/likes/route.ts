// app/api/likes/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Like from '@/models/Like'

export async function GET(req: Request) {
    try {
        await connectToDatabase()
        const { searchParams } = new URL(req.url)
        const targetId = searchParams.get('targetId')
        if (!targetId) {
            return NextResponse.json({ error: 'Missing targetId' }, { status: 400 })
        }
        // cari atau inisialisasi
        let doc = await Like.findOne({ targetId })
        if (!doc) {
            doc = await Like.create({ targetId })
        }
        return NextResponse.json({
            likes: doc.likes,
            dislikes: doc.dislikes,
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Could not load likes' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const { targetId, action } = await req.json() as {
            targetId: string
            action: 'like' | 'dislike'
        }
        if (!targetId || !['like', 'dislike'].includes(action)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
        }
        const doc = await Like.findOneAndUpdate(
            { targetId },
            {
                $inc:
                    action === 'like'
                        ? { likes: 1, ...(await Like.findOne({ targetId })).dislikes && {} }
                        : { dislikes: 1 },
            },
            { upsert: true, new: true }
        )
        return NextResponse.json({
            likes: doc.likes,
            dislikes: doc.dislikes,
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Could not update likes' }, { status: 500 })
    }
}