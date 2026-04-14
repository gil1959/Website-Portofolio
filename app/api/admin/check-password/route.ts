// app/api/admin/check-password/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const { password } = await request.json()

    // Cek password terhadap ENV var (ADMIN_PASSWORD)
    if (password === process.env.ADMIN_PASSWORD) {
        // Set secure server-side session cookie
        const sessionSecret = process.env.ADMIN_SESSION_SECRET || 'fallback_secret_do_not_use_in_prod'
        
        cookies().set('admin_session', sessionSecret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 day
        })

        return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: false }, { status: 401 })
}
