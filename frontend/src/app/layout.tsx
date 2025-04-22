import type { Metadata } from "next";
import Header from "./layout/header/Header";
import "./ui/globals.css";
import "./ui/fonts"


export const metadata: Metadata = {
  title: "Federacion Chaqueña de Boxeo",
  description: "descubre el boxeo en la provincia del Chaco",
  metadataBase: new URL("https://federation-rho.vercel.app")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
