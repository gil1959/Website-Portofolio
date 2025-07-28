// app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongoose';
import { Blog } from '../../../models/Blog';

export async function GET() {
    await dbConnect();
    const posts = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();
    const created = await Blog.create(data);
    return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: Request) {
    await dbConnect();
    const { id, ...updates } = await req.json();
    const updated = await Blog.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) await Blog.findByIdAndDelete(id);
    return NextResponse.json(null, { status: 204 });
}
