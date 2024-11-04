// components/TicketForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketForm({ email }: { email: string }) {
  const [containerType, setContainerType] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/tickets', {
      method: 'POST',
      body: JSON.stringify({ containerType, location }),
    });

    if (res.ok) {
      setMessage('Ticket reportado exitosamente');
      setContainerType('');
      setLocation('');
      // Opcional: redirigir o actualizar la lista de tickets
    } else {
      const data = await res.json();
      setMessage(data.error || 'Error al reportar el ticket');
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">Reportar Contenedor Lleno</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Tipo de contenedor"
          value={containerType}
          onChange={(e) => setContainerType(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button className="w-full p-2 text-white bg-green-500 rounded" type="submit">
          Enviar Reporte
        </button>
      </form>
    </div>
  );
}
