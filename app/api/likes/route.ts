// app/api/likes/route.ts
import { NextResponse } from 'next/server';
// relative path: dari app/api/likes → naik tiga level → ke lib/mongoose
import { dbConnect } from '../../../lib/mongoose';
// dari app/api/likes → naik tiga level → ke models/Like
import { Like } from '../../../models/Like';

export async function GET() {
    await dbConnect();
    const likes = await Like.countDocuments({ isLike: true });
    const dislikes = await Like.countDocuments({ isLike: false });
    return NextResponse.json({ likes, dislikes });
}

export async function POST(request: Request) {
    await dbConnect();
    const { project, vote } = await request.json() as { project: string; vote: 'like' | 'dislike' };
    const doc = await Like.create({ project, isLike: vote === 'like' });
    return NextResponse.json(doc, { status: 201 });
}
