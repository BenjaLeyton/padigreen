// app/forgot-password/page.tsx
'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Mensaje de éxito/error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Hemos enviado instrucciones para restablecer tu contraseña a tu correo electrónico.');
    } else {
      setMessage(data.error || 'Error al solicitar restablecimiento de contraseña.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Recuperar Contraseña</h1>
        {message && <p className="mb-4">{message}</p>} {/* Mostrar mensaje */}
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full p-2 text-white bg-blue-500 rounded" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
