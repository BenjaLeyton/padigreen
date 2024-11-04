// app/page.tsx

import { cookies } from 'next/headers';
import { verifyToken } from './lib/auth';
import { redirect } from 'next/navigation';

export default async function MainPage() {
  const token = (await cookies()).get('token')?.value;

  if (!token || !verifyToken(token)) {
    redirect('/login');
  } else {
    const user = verifyToken(token) as { role: string };
    if (user.role === 'admin') {
      redirect('/admin-dashboard');
    } else {
      redirect('/home');
    }
  }
}
