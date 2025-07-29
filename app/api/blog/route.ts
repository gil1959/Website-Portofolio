// /app/api/blog/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Blog from '@/models/Blog'

// GET all posts
export async function GET() {
    await connectToDatabase()
    const posts = await Blog.find().sort({ date: -1 })
    return NextResponse.json(posts)
}

// POST new post
export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const {
            title, slug, excerpt, content,
            image, category, readTime, date, tags
        } = await req.json()

        if (!title || !slug || !excerpt || !content) {
            return NextResponse.json(
                { error: 'title, slug, excerpt, content are required' },
                { status: 400 }
            )
        }

        const created = await Blog.create({
            title,
            slug,
            excerpt,
            content,
            image,
            category,
            readTime,
            date: new Date(date),
            tags
        })
        return NextResponse.json(created, { status: 201 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Could not create post' }, { status: 500 })
    }
}

// PUT edit post
export async function PUT(req: Request) {
    try {
        await connectToDatabase()
        const {
            id, title, slug, excerpt, content,
            image, category, readTime, date, tags
        } = await req.json()
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        const updated = await Blog.findByIdAndUpdate(
            id,
            {
                title, slug, excerpt, content,
                image, category, readTime,
                date: new Date(date), tags
            },
            { new: true }
        )
        return NextResponse.json(updated)
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Could not update post' }, { status: 500 })
    }
}

// DELETE post
export async function DELETE(req: Request) {
    try {
        await connectToDatabase()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }
        await Blog.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Could not delete post' }, { status: 500 })
    }
}
