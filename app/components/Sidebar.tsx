// components/Sidebar.tsx
'use client';

import Link from 'next/link';

export default function Sidebar({ role }: { role: string }) {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 shadow-lg text-gray-700">
      <ul className="space-y-4">
        <li>
          <Link href="/home" className="flex items-center p-2 space-x-2 rounded-lg hover:bg-green-100">
            <span className="text-2xl">🏠</span>
            <span className="font-semibold">Inicio</span>
          </Link>
        </li>
        <li>
          <Link href="/submit-ticket" className="flex items-center p-2 space-x-2 rounded-lg hover:bg-green-100">
            <span className="text-2xl">📋</span>
            <span className="font-semibold">Reportar Contenedor</span>
          </Link>
        </li>
        {role === 'admin' && (
          <li>
            <Link href="/admin-dashboard" className="flex items-center p-2 space-x-2 rounded-lg hover:bg-green-100">
              <span className="text-2xl">🛠️</span>
              <span className="font-semibold">Gestionar Tickets</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
