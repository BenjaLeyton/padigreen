// app/components/Navbar.tsx
'use client';

import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';

export default async function Navbar() {
  const token = (await cookies()).get('token')?.value;
  const isAuthenticated = token && verifyToken(token) ? true : false;

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/logout">Cerrar Sesión</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login">Iniciar Sesión</a>
            </li>
            <li>
              <a href="/register">Registrarse</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
