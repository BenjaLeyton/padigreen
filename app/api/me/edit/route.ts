// app/api/me/edit/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

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

  const { companyName, adminName, companyNumber, address, storeHours } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        companyName,
        adminName,
        companyNumber,
        address,
        storeHours,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return NextResponse.json({ error: 'Error al actualizar el perfil' }, { status: 500 });
  }
}
