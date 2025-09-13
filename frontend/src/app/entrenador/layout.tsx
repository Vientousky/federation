import type { Metadata } from "next";
import Header from "../layout/header/Header";

export const metadata: Metadata = {
  title: 'Federación Chaqueña de Boxeo - Entrenador',
  description: 'Descubre los entrenadores de la Federación Chaqueña de Boxeo',
  metadataBase: new URL('https://federation-rho.vercel.app/entrenador'),
  
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
