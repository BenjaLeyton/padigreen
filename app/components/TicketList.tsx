// components/TicketList.tsx
'use client';

import { useState } from 'react';

export default function TicketList({ tickets }: { tickets: any[] }) {
  const [ticketList, setTicketList] = useState(tickets);

  const updateTicketStatus = async (ticketId: number, status: string) => {
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updatedTicket = await res.json();
      setTicketList((prev) =>
        prev.map((ticket) => (ticket.id === ticketId ? updatedTicket : ticket))
      );
    } else {
      // Manejar errores aquí
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Tickets Reportados</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Tipo de Contenedor</th>
            <th className="px-4 py-2">Ubicación</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ticketList.map((ticket) => (
            <tr key={ticket.id}>
              <td className="px-4 py-2 border">{ticket.id}</td>
              <td className="px-4 py-2 border">{ticket.containerType}</td>
              <td className="px-4 py-2 border">{ticket.location}</td>
              <td className="px-4 py-2 border">{ticket.status}</td>
              <td className="px-4 py-2 border">
                <button
                  className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                  onClick={() => updateTicketStatus(ticket.id, 'completed')}
                >
                  Completar
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded"
                  onClick={() => updateTicketStatus(ticket.id, 'cancelled')}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
