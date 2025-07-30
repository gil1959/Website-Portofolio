// app/api/admin/check-password/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { password } = await request.json()

    // Cek password terhadap ENV var (ADMIN_PASSWORD)
    if (password === process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: false }, { status: 401 })
}
