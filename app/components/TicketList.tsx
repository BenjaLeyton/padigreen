// components/TicketList.tsx
'use client';

import { useState, useEffect } from 'react';

export default function TicketList({ tickets, role }: { tickets: any[]; role: string }) {
  const [ticketList, setTicketList] = useState(tickets);
  const [filterCompanyName, setFilterCompanyName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    console.log('Tickets recibidos en TicketList:', tickets); // Añadir este log
    let filteredTickets = tickets;

    if (filterCompanyName) {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.user.companyName.toLowerCase().includes(filterCompanyName.toLowerCase())
      );
    }

    if (filterStatus) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === filterStatus);
    }

    // Ordenar por fecha (más reciente primero)
    filteredTickets.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setTicketList(filteredTickets);
  }, [filterCompanyName, filterStatus, tickets]);

  const updateTicketStatus = async (ticketId: number, status: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Agregar este header
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updatedTicket = await res.json();
        setTicketList((prev) =>
          prev.map((ticket) => (ticket.id === ticketId ? updatedTicket : ticket))
        );
        console.log('Estado del ticket actualizado correctamente');
      } else {
        const errorData = await res.json();
        console.error('Error al actualizar el estado del ticket:', errorData.error);
      }
    } catch (error) {
      console.error('Error al actualizar el estado del ticket:', error);
    }
  };

  const deleteTicket = async (ticketId: number) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTicketList((prev) => prev.filter((ticket) => ticket.id !== ticketId));
        console.log('Ticket eliminado correctamente');
      } else {
        const errorData = await res.json();
        console.error('Error al eliminar el ticket:', errorData.error);
      }
    } catch (error) {
      console.error('Error al eliminar el ticket:', error);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Tickets</h2>
      {/* Campos de filtro */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por nombre de empresa"
          value={filterCompanyName}
          onChange={(e) => setFilterCompanyName(e.target.value)}
          className="p-2 mr-4 border rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="in_process">En Proceso</option>
          <option value="completed">Completado</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre de la Empresa</th>
            <th className="px-4 py-2">Tipo de Contenedor</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ticketList.map((ticket) => (
            <tr key={ticket.id}>
              <td className="px-4 py-2 border">{ticket.id}</td>
              <td className="px-4 py-2 border">
                {ticket.user ? ticket.user.companyName : 'N/A'}
              </td>
              <td className="px-4 py-2 border">{ticket.containerType}</td>
              <td className="px-4 py-2 border">{ticket.status}</td>
              <td className="px-4 py-2 border">
                {new Date(ticket.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border">
                {role === 'admin' && (
                  <>
                    {ticket.status !== 'completed' && (
                      <>
                        <button
                          className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded"
                          onClick={() => updateTicketStatus(ticket.id, 'in_process')}
                        >
                          En Proceso
                        </button>
                        <button
                          className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                          onClick={() => updateTicketStatus(ticket.id, 'completed')}
                        >
                          Completar
                        </button>
                      </>
                    )}
                    <button
                      className="px-2 py-1 text-white bg-red-500 rounded"
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
                {role !== 'admin' && (
                  <>
                    {ticket.status === 'pending' && (
                      <button
                        className="px-2 py-1 text-white bg-red-500 rounded"
                        onClick={() => deleteTicket(ticket.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
