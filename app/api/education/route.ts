// app/api/education/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Education from '@/models/Education'

// GET /api/education
export async function GET() {
    await connectToDatabase()
    const data = await Education.find().sort({ createdAt: -1 })
    return NextResponse.json(data)
}

// POST /api/education
export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const {
            degree,
            institution,
            period,
            location,
            gpa,
            description,
            achievements,
        } = await req.json()

        // minimal validation
        if (!degree || !institution || !period || !location) {
            return NextResponse.json(
                { error: 'degree, institution, period, and location are required' },
                { status: 400 }
            )
        }

        const created = await Education.create({
            degree,
            institution,
            period,
            location,
            gpa,
            description,
            achievements,
        })

        return NextResponse.json(created, { status: 201 })
    } catch (e) {
        console.error('POST /api/education error:', e)
        return NextResponse.json({ error: 'POST education failed' }, { status: 500 })
    }
}

// PUT /api/education
export async function PUT(req: Request) {
    try {
        await connectToDatabase()
        const {
            id,
            degree,
            institution,
            period,
            location,
            gpa,
            description,
            achievements,
        } = await req.json()
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        const updated = await Education.findByIdAndUpdate(
            id,
            { degree, institution, period, location, gpa, description, achievements },
            { new: true }
        )
        return NextResponse.json(updated)
    } catch (e) {
        console.error('PUT /api/education error:', e)
        return NextResponse.json({ error: 'PUT education failed' }, { status: 500 })
    }
}

// DELETE /api/education?id=…
export async function DELETE(req: Request) {
    try {
        await connectToDatabase()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        await Education.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        console.error('DELETE /api/education error:', e)
        return NextResponse.json({ error: 'DELETE education failed' }, { status: 500 })
    }
}
