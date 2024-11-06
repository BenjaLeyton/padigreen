// app/admin-dashboard/page.tsx

import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';
import { redirect } from 'next/navigation';
import AdminDashboardContent from './AdminDashboardContent';
import { getAllTickets } from '../lib/db';

export default async function AdminDashboardPage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);

  if (!user || typeof user === 'string') {
    redirect('/login');
  }

  const { email, role } = user as { email: string; role: string };

  if (role !== 'admin') {
    redirect('/home');
  }

  const tickets = await getAllTickets();
  console.log('Tickets obtenidos:', tickets); // Añadir este log
  return <AdminDashboardContent email={email} role={role} tickets={tickets} />;
}
