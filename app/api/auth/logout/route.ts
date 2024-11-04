// app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Cierre de sesión exitoso' });
  response.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
