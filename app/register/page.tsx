// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' o 'admin'
  const [error, setError] = useState(''); // Estado para el mensaje de error
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reiniciar mensaje de error

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Error al registrarse'); // Establecer mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Registrarse</h1>
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
        <select
          className="w-full p-2 mb-4 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button className="w-full p-2 text-white bg-blue-500 rounded" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}
