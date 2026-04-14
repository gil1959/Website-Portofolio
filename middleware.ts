// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // protect semua /admin/* kecuali /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET || 'fallback_secret_do_not_use_in_prod'
        const auth = req.cookies.get('admin_session')?.value
        
        if (auth !== sessionSecret) {
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
