// app/home/page.tsx

import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';
import { redirect } from 'next/navigation';
import HomeContent from './HomeContent';
import { prisma } from '../lib/db';

export default async function HomePage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);

  if (!user || typeof user === 'string') {
    redirect('/login');
  }

  const { id, role } = user as { id: number; role: string };

  let tickets = [];

  if (role === 'admin') {
    tickets = await prisma.ticket.findMany({
      where: { deleted: false },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  } else {
    tickets = await prisma.ticket.findMany({
      where: { userId: id, deleted: false },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  const userData = await prisma.user.findUnique({ where: { id } });

  return <HomeContent user={userData} tickets={tickets} />;
}
