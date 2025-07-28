// app/api/upload/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'

export const config = { api: { bodyParser: false } }

export async function POST(req: Request) {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) {
        return NextResponse.json({ error: 'No file' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split('.').pop()
    const filename = `${uuid()}.${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
    fs.writeFileSync(path.join(uploadDir, filename), buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
}
