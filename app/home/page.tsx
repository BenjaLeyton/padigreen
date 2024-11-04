// app/home/page.tsx

import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';
import { redirect } from 'next/navigation';
import HomeContent from './HomeContent';

export default async function HomePage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);

  if (!user || typeof user === 'string') {
    redirect('/login');
  }

  const { email, role } = user as { email: string; role: string };

  if (!email) {
    redirect('/login');
  }

  return <HomeContent email={email} role={role} />;
}
