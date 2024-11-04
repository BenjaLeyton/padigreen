// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { findUserByEmail } from '../../../lib/db';
import bcrypt from 'bcrypt';
import { signToken } from '../../../lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Por favor, completa todos los campos' }, { status: 400 });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  const response = NextResponse.json({ message: 'Inicio de sesión exitoso' });
  response.cookies.set('token', token, { httpOnly: true, path: '/' });

  return response;
}
