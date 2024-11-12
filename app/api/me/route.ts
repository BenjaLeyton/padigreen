// app/api/me/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { verifyToken } from '../../lib/auth';

export async function GET(req: Request) {
  const token = req.headers.get('cookie')?.split('token=')[1];
  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const { id } = user as { id: number };

  try {
    const userData = await prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        companyName: true,
        adminName: true,
        companyNumber: true,
        address: true,
        storeHours: true,
        role: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    return NextResponse.json({ error: 'Error al obtener el perfil' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const token = req.headers.get('cookie')?.split('token=')[1];
  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const { id } = user as { id: number };
  const updates = await req.json();

  try {
    // Validar que solo se actualizan los campos permitidos
    const allowedUpdates = [
      'companyName',
      'adminName',
      'companyNumber',
      'address',
      'storeHours',
    ];

    const dataToUpdate: any = {};
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        dataToUpdate[key] = updates[key];
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    // Excluir campos sensibles en la respuesta
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return NextResponse.json({ error: 'Error al actualizar el perfil' }, { status: 500 });
  }
}