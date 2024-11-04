// lib/email.ts

import { Resend } from 'resend';
import React from 'react';
import { PasswordResetEmail } from '../components/PasswordResetEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  try {
    console.log('Enviando correo electrónico de recuperación de contraseña...');
    console.log('Destinatario:', to);
    console.log('Enlace de restablecimiento:', resetLink);

    const emailHtml = React.createElement(PasswordResetEmail, { resetLink });

    console.log('Contenido del correo electrónico generado con React:', emailHtml);

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Reemplaza con tu dirección verificada
      to: [to],
      subject: 'Recuperación de contraseña',
      react: emailHtml,
    });

    console.log('Respuesta de Resend:', data);
    console.log('Correo electrónico enviado exitosamente.');
  } catch (error: any) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error(`Error al enviar el correo electrónico: ${error.message}`);
  }
}
