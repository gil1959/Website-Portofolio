// app/api/experience/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Experience from '@/models/Experience'

// GET all experiences
export async function GET() {
    await connectToDatabase()
    const all = await Experience.find().sort({ createdAt: -1 })
    return NextResponse.json(all)
}

// POST new experience
export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const {
            title,
            company,
            location,
            period,
            type,
            description,
            achievements,
            technologies,
            website,
        } = await req.json()

        if (!title || !company || !location || !period || !type) {
            return NextResponse.json(
                { error: 'title, company, location, period, and type are required' },
                { status: 400 }
            )
        }

        const created = await Experience.create({
            title,
            company,
            location,
            period,
            type,
            description,
            achievements,
            technologies,
            website,
        })

        return NextResponse.json(created, { status: 201 })
    } catch (e) {
        console.error('POST /api/experience error:', e)
        return NextResponse.json({ error: 'POST experience failed' }, { status: 500 })
    }
}

// PUT update experience
export async function PUT(req: Request) {
    try {
        await connectToDatabase()
        const {
            id,
            title,
            company,
            location,
            period,
            type,
            description,
            achievements,
            technologies,
            website,
        } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }

        const updated = await Experience.findByIdAndUpdate(
            id,
            { title, company, location, period, type, description, achievements, technologies, website },
            { new: true }
        )
        return NextResponse.json(updated)
    } catch (e) {
        console.error('PUT /api/experience error:', e)
        return NextResponse.json({ error: 'PUT experience failed' }, { status: 500 })
    }
}

// DELETE experience by id
export async function DELETE(req: Request) {
    try {
        await connectToDatabase()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        await Experience.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        console.error('DELETE /api/experience error:', e)
        return NextResponse.json({ error: 'DELETE experience failed' }, { status: 500 })
    }
}
