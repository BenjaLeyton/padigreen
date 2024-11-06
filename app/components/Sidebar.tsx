// components/Sidebar.tsx
'use client';

import Link from 'next/link';

export default function Sidebar({ role }: { role: string }) {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">Menú</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/home" className="block p-2 rounded hover:bg-gray-700">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/submit-ticket" className="block p-2 rounded hover:bg-gray-700">
              Reportar Contenedor
            </Link>
          </li>
          {role === 'admin' && (
            <li>
              <Link href="/admin-dashboard" className="block p-2 rounded hover:bg-gray-700">
                Gestionar Tickets
              </Link>
            </li>
          )}
          {/* Agrega más enlaces según sea necesario */}
        </ul>
      </div>
    </aside>
  );
}
