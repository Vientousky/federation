import type { Metadata } from "next";
import "./ui/globals.css";
import "./ui/fonts"

export const metadata: Metadata = {
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
        {children}
      </body>
    </html>
  );
}
