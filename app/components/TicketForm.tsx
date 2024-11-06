// components/TicketForm.tsx
'use client';

import { useState } from 'react';

interface User {
  companyName: string;
  adminName: string;
  companyNumber: string;
  address: string;
  email: string;
}

export default function TicketForm({ user }: { user: User }) {
  const [containerType, setContainerType] = useState<string>('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (containerType === '') {
      setMessage('Por favor, selecciona el tipo de contenedor.');
      return;
    }
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ containerType, comments }),
    });

    if (res.ok) {
      setMessage('Ticket reportado exitosamente');
      setContainerType('');
      setComments('');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Error al reportar el ticket');
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">Reportar Contenedor Lleno</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Campos estáticos */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Nombre de la empresa:</label>
          <p>{user.companyName}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Nombre del administrador:</label>
          <p>{user.adminName}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Número de la empresa:</label>
          <p>{user.companyNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Correo:</label>
          <p>{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Dirección:</label>
          <p>{user.address}</p>
        </div>
        {/* Tipo de Contenedor */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Tipo de contenedor:</label>
          <select
            className="w-full p-2 border rounded"
            value={containerType}
            onChange={(e) => setContainerType(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        {/* Comentarios Opcionales */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Comentarios (opcional):</label>
          <textarea
            className="w-full p-2 border rounded"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <button className="w-full p-2 text-white bg-green-500 rounded" type="submit">
          Enviar Reporte
        </button>
      </form>
    </div>
  );
}
