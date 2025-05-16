"use client";

import { usePathname } from "next/navigation";
import Asidebar from "../layout/sidebar/Asidebar";
import styles from "./index.module.css";
import React from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <div className={`${styles.contenedor} ${isLogin ? styles.login : ''}`}>
      {!isLogin && <Asidebar />}
      <main className={`${styles.page} ${isLogin ? styles.loginPage : ''}`} >{children}</main>
    </div>
  );
}
