// app/admin-dashboard/AdminDashboardContent.tsx
'use client';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TicketList from '../components/TicketList';

// app/admin-dashboard/AdminDashboardContent.tsx
export default function AdminDashboardContent({ email, role, tickets }: { email: string; role: string; tickets: any[] }) {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1">
        <Navbar role={role} />
        <main className="p-8">
          <h1 className="mb-4 text-2xl font-bold">Panel de Administración</h1>
          <p className="mb-4">Bienvenido, {email}</p>
          <TicketList tickets={tickets} role={role} /> {/* Se agrega el prop 'role' */}
        </main>
      </div>
    </div>
  );
}