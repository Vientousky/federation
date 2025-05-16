import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access')?.value

    const url = request.nextUrl.clone()

    if(!token && url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
        url.pathname = '/admin/login'
        url.searchParams.set('next', request.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}