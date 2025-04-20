import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('isLoggedIn')


    if (!isLoggedIn && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        {
            source: '/',
        },
        {
            source: '/login',
        },
    ],
}