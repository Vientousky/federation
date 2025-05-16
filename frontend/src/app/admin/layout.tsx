// app/admin/layout.tsx
import LayoutClient from "./layoutClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutClient>
      {children}
    </LayoutClient>
  );
}
