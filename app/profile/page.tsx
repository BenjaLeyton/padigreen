// app/profile/page.tsx

import { cookies } from 'next/headers';
import { verifyToken } from '../lib/auth';
import { redirect } from 'next/navigation';
import ProfileContent from './ProfileContent';
import { prisma } from '../lib/db';

export default async function ProfilePage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);

  if (!user || typeof user === 'string') {
    redirect('/login');
  }

  const { id } = user as { id: number };

  const userData = await prisma.user.findUnique({ where: { id } });

  return <ProfileContent user={userData} />;
}
