// app/api/certificates/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongoose';
import { Certificate } from '../../../models/Certificate';

export async function GET() {
    await dbConnect();
    const items = await Certificate.find().sort({ issueDate: -1 });
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();
    const created = await Certificate.create(data);
    return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: Request) {
    await dbConnect();
    const { id, ...updates } = await req.json();
    const updated = await Certificate.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) await Certificate.findByIdAndDelete(id);
    return NextResponse.json(null, { status: 204 });
}
