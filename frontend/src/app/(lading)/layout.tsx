import type { Metadata } from "next";
import Header from "../layout/header/Header"

export const metadata: Metadata = {
  title: "Federacion Chaqueña de Boxeo",
  description: "descubre el boxeo en la provincia del Chaco",
  metadataBase: new URL("https://federation-rho.vercel.app")
};

export default function AdminLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <>
        <Header/>
        {children}
        </>
    )
}