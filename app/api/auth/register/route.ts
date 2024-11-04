// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '../../../lib/db';

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  if (!email || !password || !role) {
    return NextResponse.json({ error: 'Por favor, completa todos los campos' }, { status: 400 });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 });
  }

  await createUser(email, password, role);
  return NextResponse.json({ message: 'Usuario creado' }, { status: 201 });
}
