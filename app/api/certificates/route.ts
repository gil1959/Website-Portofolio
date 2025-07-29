// app/api/certificates/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Certificate from '@/models/Certificate'

// GET /api/certificates
export async function GET() {
    await connectToDatabase()
    const all = await Certificate.find().sort({ issueDate: -1 })
    return NextResponse.json(all)
}

// POST /api/certificates
export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const {
            title,
            issuer,
            issueDate,
            description,
            credentialId,
            skills,
            verifyUrl,
            image,
        } = await req.json()

        if (!title || !issuer || !issueDate) {
            return NextResponse.json(
                { error: 'title, issuer, dan issueDate wajib diisi' },
                { status: 400 }
            )
        }

        const created = await Certificate.create({
            title,
            issuer,
            issueDate,
            description,
            credentialId,
            skills,
            verifyUrl,
            image,
        })

        return NextResponse.json(created, { status: 201 })
    } catch (e) {
        console.error('POST /api/certificates error:', e)
        return NextResponse.json({ error: 'POST certificate gagal' }, { status: 500 })
    }
}

// PUT /api/certificates
export async function PUT(req: Request) {
    try {
        await connectToDatabase()
        const {
            id,
            title,
            issuer,
            issueDate,
            description,
            credentialId,
            skills,
            verifyUrl,
            image,
        } = await req.json()
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        const updated = await Certificate.findByIdAndUpdate(
            id,
            { title, issuer, issueDate, description, credentialId, skills, verifyUrl, image },
            { new: true }
        )
        return NextResponse.json(updated)
    } catch (e) {
        console.error('PUT /api/certificates error:', e)
        return NextResponse.json({ error: 'PUT certificate gagal' }, { status: 500 })
    }
}

// DELETE /api/certificates?id=…
export async function DELETE(req: Request) {
    try {
        await connectToDatabase()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        await Certificate.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        console.error('DELETE /api/certificates error:', e)
        return NextResponse.json({ error: 'DELETE certificate gagal' }, { status: 500 })
    }
}
