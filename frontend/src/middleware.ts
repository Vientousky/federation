// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // o el nombre que usás
  // Proteger rutas bajo /admin
  if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Define qué rutas se protegen
export const config = {
  matcher: ["/admin/:path*" ],
};
