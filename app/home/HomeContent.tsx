// app/home/HomeContent.tsx
'use client';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TicketList from '../components/TicketList';

export default function HomeContent({ user, tickets }: { user: any; tickets: any[] }) {
  return (
    <div className="flex">
      <Sidebar role={user.role} />
      <div className="flex-1">
        <Navbar role={user.role} />
        <main className="p-8">
          <h1 className="text-2xl font-bold">Bienvenido, {user.email}</h1>
          <p className="mt-2">Tu rol es: {user.role}</p>
          {user.role === 'user' ? (
            <TicketList tickets={tickets} role={user.role} />
          ) : (
            <div className="mt-8 text-center text-gray-600">
              <h2 className="text-xl font-semibold">Futuro Dashboard</h2>
              <p>Próximamente podrás acceder a tu panel de administrador aquí.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
