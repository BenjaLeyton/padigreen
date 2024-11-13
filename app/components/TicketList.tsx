'use client';

import { useState, useEffect } from 'react';

// Definición de los tipos para los datos
interface User {
  companyName: string;
  adminName: string;
  companyNumber: string;
  address: string;
  email: string;
  storeHours: string; // Añade esta línea
}

interface Ticket {
  id: number;
  user?: User | null;
  containerType: string;
  status: string;
  createdAt: string;
  comments?: string;
}

// Función para traducir los estados al español
const mapStatusToSpanish = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'in_process':
      return 'En Proceso';
    case 'completed':
      return 'Completado';
    default:
      return status;
  }
};

// Opciones de formato para la fecha
const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export default function TicketList({
  tickets,
  role,
}: {
  tickets: Ticket[];
  role: string;
}) {
  const [originalTickets, setOriginalTickets] = useState<Ticket[]>(tickets);
  const [ticketList, setTicketList] = useState<Ticket[]>(tickets);
  const [filterCompanyName, setFilterCompanyName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const applyFilters = () => {
    let filteredTickets = [...originalTickets];

    if (role === 'admin' && filterCompanyName) {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.user?.companyName.toLowerCase().includes(filterCompanyName.toLowerCase())
      );
    }

    if (filterStatus) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === filterStatus);
    }

    filteredTickets.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setTicketList(filteredTickets);
  };

  useEffect(() => {
    applyFilters();
  }, [filterCompanyName, filterStatus, originalTickets]);

  const updateTicketStatus = async (ticketId: number, status: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updatedTicket = await res.json();
        const updatedTickets = originalTickets.map((ticket) =>
          ticket.id === ticketId ? updatedTicket : ticket
        );

        setOriginalTickets(updatedTickets);
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
        setOriginalTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
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
      <div className="mb-4 flex space-x-4">
        {role === 'admin' && (
          <input
            type="text"
            placeholder="Filtrar por nombre de empresa"
            value={filterCompanyName}
            onChange={(e) => setFilterCompanyName(e.target.value)}
            className="p-2 border rounded"
          />
        )}
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

      {role === 'admin' ? (
        // Renderizado en formato de tabla para administradores
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre de la Empresa</th>
              <th className="px-4 py-2">Nombre del Administrador</th>
              <th className="px-4 py-2">Número de la Empresa</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Horario del Local</th>
              <th className="px-4 py-2">Tipo de Contenedor</th>
              <th className="px-4 py-2">Comentarios</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ticketList.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-4 py-2 border">{ticket.id}</td>
                <td className="px-4 py-2 border">{ticket.user?.companyName || 'N/A'}</td>
                <td className="px-4 py-2 border">{ticket.user?.adminName || 'N/A'}</td>
                <td className="px-4 py-2 border">{ticket.user?.companyNumber || 'N/A'}</td>
                <td className="px-4 py-2 border">{ticket.user?.email || 'N/A'}</td>
                <td className="px-4 py-2 border">{ticket.user?.address || 'N/A'}</td>
                <td className="px-4 py-2 border">{ticket.user?.storeHours || 'N/A'}</td>
                <td className="px-4 py-2 border">{ticket.containerType}</td>
                <td className="px-4 py-2 border">{ticket.comments || 'N/A'}</td>
                <td className="px-4 py-2 border">{mapStatusToSpanish(ticket.status)}</td>
                <td className="px-4 py-2 border">
                  {new Date(ticket.createdAt).toLocaleString('es-ES', dateOptions)}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex flex-col space-y-2 items-center">
                    {ticket.status !== 'completed' && (
                      <>
                        <button
                          className="w-24 px-3 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
                          onClick={() => updateTicketStatus(ticket.id, 'in_process')}
                        >
                          En Proceso
                        </button>
                        <button
                          className="w-24 px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                          onClick={() => updateTicketStatus(ticket.id, 'completed')}
                        >
                          Completar
                        </button>
                      </>
                    )}
                    <button
                      className="w-24 px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Renderizado en formato de tarjeta para usuarios
        <div className="space-y-6">
          {ticketList.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 bg-white border rounded-lg shadow-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Ticket ID: {ticket.id}</h3>
                <span
                  className={`py-1 px-3 rounded-full text-white ${
                    ticket.status === 'completed'
                      ? 'bg-green-500'
                      : ticket.status === 'in_process'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {mapStatusToSpanish(ticket.status)}
                </span>
              </div>
              <p><strong>Nombre de la Empresa:</strong> {ticket.user?.companyName || 'N/A'}</p>
              <p><strong>Nombre del Administrador:</strong> {ticket.user?.adminName || 'N/A'}</p>
              <p><strong>Número de la Empresa:</strong> {ticket.user?.companyNumber || 'N/A'}</p>
              <p><strong>Correo:</strong> {ticket.user?.email || 'N/A'}</p>
              <p><strong>Dirección:</strong> {ticket.user?.address || 'N/A'}</p>
              <p><strong>Horario del Local:</strong> {ticket.user?.storeHours || 'N/A'}</p>
              <p><strong>Tipo de Contenedor:</strong> {ticket.containerType}</p>
              <p><strong>Comentarios:</strong> {ticket.comments || 'N/A'}</p>
              <p><strong>Fecha:</strong> {new Date(ticket.createdAt).toLocaleString('es-ES', dateOptions)}</p>
              <div className="flex space-x-4 mt-4">
                {ticket.status === 'pending' && (
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => deleteTicket(ticket.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
