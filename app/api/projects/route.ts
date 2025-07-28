// app/api/projects/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Project from '@/models/Project'

// GET /api/projects
export async function GET() {
    await connectToDatabase()
    const all = await Project.find().sort({ createdAt: -1 })
    return NextResponse.json(all)
}

// POST /api/projects
export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const {
            title,
            description,
            url,
            image,
            category,
            githubUrl,
            liveUrl,
            featured,      // ← terima
            status,        // ← terima
        } = await req.json()

        if (!title || !description || !url) {
            return NextResponse.json(
                { error: 'title, description, dan url wajib diisi' },
                { status: 400 }
            )
        }

        const created = await Project.create({
            title,
            description,
            url,
            image,
            category,
            githubUrl,
            liveUrl,
            featured,      // ← simpan
            status,        // ← simpan
        })

        return NextResponse.json(created, { status: 201 })
    } catch (e) {
        console.error('POST /api/projects error:', e)
        return NextResponse.json({ error: 'POST project gagal' }, { status: 500 })
    }
}

// PUT /api/projects
export async function PUT(req: Request) {
    try {
        await connectToDatabase()
        const {
            id,
            title,
            description,
            url,
            image,
            category,
            githubUrl,
            liveUrl,
            featured,    // ← terima
            status,      // ← terima
        } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }

        const updated = await Project.findByIdAndUpdate(
            id,
            { title, description, url, image, category, githubUrl, liveUrl, featured, status },
            { new: true }
        )
        return NextResponse.json(updated)
    } catch (e) {
        console.error('PUT /api/projects error:', e)
        return NextResponse.json({ error: 'PUT project gagal' }, { status: 500 })
    }
}

// DELETE /api/projects?id=…
export async function DELETE(req: Request) {
    try {
        await connectToDatabase()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        await Project.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        console.error('DELETE /api/projects error:', e)
        return NextResponse.json({ error: 'DELETE project gagal' }, { status: 500 })
    }
}
