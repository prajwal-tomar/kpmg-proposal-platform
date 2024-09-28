'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/header";
import { ProtectedRoute } from '../components/protected-route';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <Header />
      {children}
    </ProtectedRoute>
  );
}