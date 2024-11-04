// app/logout/page.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
      router.push('/login');
    });
  }, [router]);

  return <p>Cerrando sesión...</p>;
}
