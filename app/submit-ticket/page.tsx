// app/submit-ticket/page.tsx

import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';
import { redirect } from 'next/navigation';
import SubmitTicketContent from './SubmitTicketContent';

export default async function SubmitTicketPage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);

  if (!user || typeof user === 'string') {
    redirect('/login');
  }

  const { email, role } = user as { email: string; role: string };

  if (role !== 'user') {
    redirect('/home');
  }

  return <SubmitTicketContent email={email} role={role} />;
}



