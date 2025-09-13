// app/admin/layout.tsx
import Asidebar from '../layout/sidebar/Asidebar';
import './index.css'

export default function LayoutDasboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Asidebar/>
      {children}
    </>
  );
}
