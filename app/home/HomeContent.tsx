// app/home/HomeContent.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function HomeContent({ email, role }: { email: string; role: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Bienvenido, {email}</h1>
      <p>Tu rol es: {role}</p>
      <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
        Cerrar sesión
      </button>
    </div>
  );
}
