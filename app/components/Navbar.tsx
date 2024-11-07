// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar({ role }: { role: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-gray-700 shadow-md">
      <div className="flex items-center space-x-4">
        <Link href="/home">
          <Image
            src="/logo_padigren3.png" // Ruta del logo en la carpeta public
            alt="Logo de la empresa"
            width={300} // Tamaño ajustado
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
