// app/api/auth/forgot-password/route.ts

import { NextResponse } from 'next/server';
import { findUserByEmail, savePasswordResetToken } from '../../../lib/db';
import { signToken } from '../../../lib/auth';
import { sendPasswordResetEmail } from '../../../lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log('Solicitud de recuperación de contraseña recibida para:', email);

    if (!email) {
      console.log('No se proporcionó un correo electrónico.');
      return NextResponse.json({ error: 'Por favor, proporciona tu correo electrónico' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      console.log('Usuario no encontrado:', email);
      // Por seguridad, no revelamos si el correo existe o no
      return NextResponse.json({ message: 'Si el correo existe, se han enviado instrucciones' });
    }

    // Generar token de restablecimiento
    const token = signToken({ id: user.id }, '1h'); // Expira en 1 hora
    console.log('Token de restablecimiento generado:', token);

    // Guardar el token en la base de datos
    await savePasswordResetToken(user.id, token);
    console.log('Token de restablecimiento guardado en la base de datos.');

    // Construir el enlace de restablecimiento
    const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;
    console.log('Enlace de restablecimiento construido:', resetLink);

    // Enviar el correo electrónico
    try {
      await sendPasswordResetEmail(email, resetLink);
      console.log('Correo electrónico de restablecimiento enviado a:', email);
      return NextResponse.json({ message: 'Se han enviado instrucciones para restablecer tu contraseña' });
    } catch (error: any) {
      console.error('Error al enviar el correo electrónico:', error);
      return NextResponse.json({ error: `Error al enviar el correo electrónico: ${error.message}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error en la solicitud de recuperación de contraseña:', error);
    return NextResponse.json({ error: 'Error en la solicitud' }, { status: 500 });
  }
}
