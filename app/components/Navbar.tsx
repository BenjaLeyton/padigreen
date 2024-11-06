// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar({ role }: { role: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <div>
        <Link href="/home" className="text-xl font-bold">
          Glass Collection App
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/home" className="hover:underline">
          Inicio
        </Link>
        <Link href="/submit-ticket" className="hover:underline">
          Reportar Contenedor
        </Link>
        {role === 'admin' && (
          <Link href="/admin-dashboard" className="hover:underline">
            Gestionar Tickets
          </Link>
        )}
        <button onClick={handleLogout} className="hover:underline">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
