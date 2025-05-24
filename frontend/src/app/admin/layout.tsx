// app/admin/layout.tsx
import './index.css'
import LayoutClient from "./layoutClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutClient>
      {children}
    </LayoutClient>
  );
}
