// app/api/tickets/route.ts

import { NextResponse } from 'next/server';
import { createTicket, findUserByEmail } from '../../lib/db';
import { verifyToken } from '../../lib/auth';

export async function POST(req: Request) {
  try {
    const { containerType, comments } = await req.json();

    // Validar que containerType es válido
    const validContainerTypes = ['Pequeño', 'Mediano', 'Grande'];
    if (!containerType || !validContainerTypes.includes(containerType)) {
      return NextResponse.json({ error: 'Tipo de contenedor inválido' }, { status: 400 });
    }

    // Verificar autenticación
    const token = req.headers.get('cookie')?.split('token=')[1];
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || typeof user === 'string') {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const { id: userId } = user as { id: number };

    // Crear el ticket
    const ticket = await createTicket(userId, containerType, comments);

    return NextResponse.json({ message: 'Ticket creado exitosamente', ticket }, { status: 201 });
  } catch (error: any) {
    console.error('Error al crear el ticket:', error);
    return NextResponse.json({ error: 'Error al crear el ticket' }, { status: 500 });
  }
}
