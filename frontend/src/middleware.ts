/**
 * ---------------------------------------------------------------
 *
 * ⚠️ ARCHIVO DE PROTECION DE PANEL DE ADMINITRACIÓN
 *
 * (⌐■_■) Si alguien intenta acceder al panel de adminitración sin autenticarse
 * sera redirigido automaticamente a /login de adminitración
 *
 * ‼️ Solo se aplicara a las rutas que empiece con /admin 
 *
 * ATT: Vientousky 💕
 * 
 * ---------------------------------------------------------------
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
}