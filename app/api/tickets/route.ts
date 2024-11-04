// app/api/tickets/route.ts

import { NextResponse } from 'next/server';
import { createTicket } from '../../lib/db';
import { verifyToken } from '../../lib/auth';

export async function POST(req: Request) {
  const token = req.headers.get('cookie')?.split('token=')[1];
  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const { id: userId } = user as { id: number };

  const { containerType, location } = await req.json();

  if (!containerType || !location) {
    return NextResponse.json({ error: 'Campos faltantes' }, { status: 400 });
  }

  const ticket = await createTicket(userId, containerType, location);
  return NextResponse.json(ticket, { status: 201 });
}
