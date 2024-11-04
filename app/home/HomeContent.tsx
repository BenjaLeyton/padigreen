// app/home/HomeContent.tsx
'use client';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function HomeContent({ email, role }: { email: string; role: string }) {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1">
        <Navbar role={role} />
        <main className="p-8">
          <h1 className="text-2xl font-bold">Bienvenido, {email}</h1>
          <p className="mt-2">Tu rol es: {role}</p>
          {/* Aquí puedes agregar contenido adicional o componentes según sea necesario */}
        </main>
      </div>
    </div>
  );
}
