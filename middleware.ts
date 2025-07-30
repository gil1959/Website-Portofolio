// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // protect semua /admin/* kecuali /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const auth = req.cookies.get('adminAuth')?.value
        if (auth !== 'true') {
            const loginUrl = req.nextUrl.clone()
            loginUrl.pathname = '/admin/login'
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
