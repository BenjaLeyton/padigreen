// app/submit-ticket/page.tsx

import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';
import { redirect } from 'next/navigation';
import SubmitTicketContent from './SubmitTicketContent';
import { prisma } from '../lib/db';

export default async function SubmitTicketPage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);

  if (!user || typeof user === 'string') {
    redirect('/login');
  }

  const { id } = user as { id: number; role: string };

  const userData = await prisma.user.findUnique({ where: { id } });

  return <SubmitTicketContent user={userData} />;
}
