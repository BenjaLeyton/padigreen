// app/api/tickets/[id]/route.ts

import { NextResponse } from 'next/server';
import { updateTicketStatus } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const token = req.headers.get('cookie')?.split('token=')[1];
  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const { role } = user as { role: string };

  if (role !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const ticketId = parseInt(params.id, 10);
  const { status } = await req.json();

  if (!['pending', 'completed', 'cancelled'].includes(status)) {
    return NextResponse.json({ error: 'Estado inválido' }, { status: 400 });
  }

  const updatedTicket = await updateTicketStatus(ticketId, status);
  return NextResponse.json(updatedTicket);
}
