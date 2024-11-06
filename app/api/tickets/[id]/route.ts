// app/api/tickets/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export async function PUT(req: Request, context: { params: { id: string } }) {
  // Verificar autenticación
  const token = req.headers.get('cookie')?.split('token=')[1];
  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const { role, id: userId } = user as { role: string; id: number };

  // Await a params antes de acceder a sus propiedades
  const { id } = await context.params;
  const ticketId = parseInt(id, 10);

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
  }

  if (role !== 'admin' && ticket.userId !== userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { status } = await req.json();

  // Validar que el estado es válido
  const validStatuses = ['pending', 'in_process', 'completed'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Estado inválido' }, { status: 400 });
  }

  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
      include: { user: true },
    });

    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el ticket:', error);
    return NextResponse.json({ error: 'Error al actualizar el ticket' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  // Verificar autenticación
  const token = req.headers.get('cookie')?.split('token=')[1];
  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const { role, id: userId } = user as { role: string; id: number };

  // Await a params antes de acceder a sus propiedades
  const { id } = await context.params;
  const ticketId = parseInt(id, 10);

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
  }

  if (role !== 'admin' && ticket.userId !== userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  // Verificar si el estado es 'pending' para usuarios no admin
  if (role !== 'admin' && ticket.status !== 'pending') {
    return NextResponse.json({ error: 'Solo se pueden eliminar tickets pendientes' }, { status: 400 });
  }

  try {
    // Eliminación lógica
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { deleted: true },
    });

    return NextResponse.json({ message: 'Ticket eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar el ticket:', error);
    return NextResponse.json({ error: 'Error al eliminar el ticket' }, { status: 500 });
  }
}
