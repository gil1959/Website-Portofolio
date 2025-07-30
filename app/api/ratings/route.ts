// app/api/ratings/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Review from '@/models/Review'    // ← point at Review, not Rating

// GET /api/ratings?page=1&limit=10
export async function GET(request: Request) {
    await connectToDatabase()
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)

    const [data, total] = await Promise.all([
        Review.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
        Review.countDocuments(),
    ])

    return NextResponse.json({ data, page, limit, total })
}

// POST /api/ratings
export async function POST(request: Request) {
    await connectToDatabase()
    const { name, role, company, text, avatar } = await request.json()

    if (!name || !role || !company || !text) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const created = await Review.create({ name, role, company, text, avatar })
    return NextResponse.json(created, { status: 201 })
}

// DELETE /api/ratings?id=…
export async function DELETE(request: Request) {
    await connectToDatabase()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }

    const deleted = await Review.findByIdAndDelete(id)
    if (!deleted) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Deleted' }, { status: 200 })
}
