// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para el mensaje de error
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reiniciar mensaje de error

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/home');
    } else {
      const data = await res.json();
      setError(data.error || 'Error al iniciar sesión'); // Establecer mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Iniciar Sesión</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>} {/* Mostrar error */}
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full p-2 text-white bg-blue-500 rounded" type="submit">
          Iniciar Sesión
        </button>
        <p className="mt-4 text-center">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-500">
            Regístrate aquí
          </a>
        </p>
        <p className="mt-2 text-center">
          ¿Olvidaste tu contraseña?{' '}
          <a href="/forgot-password" className="text-blue-500">
            Recupérala aquí
          </a>
        </p>
      </form>
    </div>
  );
}
