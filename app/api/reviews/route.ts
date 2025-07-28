// app/api/reviews/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongoose';
import { Review } from '../../../models/Review';

export async function GET() {
    await dbConnect();
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json(reviews);
}

export async function POST(request: Request) {
    await dbConnect();
    const { author, content } = await request.json() as { author: string; content: string };
    const newReview = await Review.create({ author, content });
    return NextResponse.json(newReview, { status: 201 });
}

export async function DELETE(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) await Review.findByIdAndDelete(id);
    return NextResponse.json(null, { status: 204 });
}
