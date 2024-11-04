// app/reset-password/[token]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = params;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    const res = await fetch(`/api/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Contraseña restablecida correctamente. Redirigiendo a la página de inicio de sesión...');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      setMessage(data.error || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Restablecer Contraseña</h1>
        {message && <p className="mb-4">{message}</p>} {/* Mostrar mensaje */}
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="w-full p-2 text-white bg-blue-500 rounded" type="submit">
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
}
