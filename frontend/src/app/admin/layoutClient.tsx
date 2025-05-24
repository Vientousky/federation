"use client";

import { usePathname } from "next/navigation";
import Asidebar from "../layout/sidebar/Asidebar";
import React from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <div className={`contenedor ${isLogin ? 'login' : ''}`}>
      {!isLogin && <Asidebar />}
      <main className={`page ${isLogin ? 'login-page' : ''}`}>{children}</main>
    </div>
  );
}
