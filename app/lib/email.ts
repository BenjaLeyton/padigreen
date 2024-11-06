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

    const response = await resend.emails.send({
      from: 'Glass Collection App <no-reply@tudominio.com>', // Reemplaza con tu dirección verificada
      to: [to],
      subject: 'Recuperación de contraseña',
      react: emailHtml,
    });

    if (response.error) {
      throw new Error(`Resend Error: ${response.error.message}`);
    }

    console.log('Respuesta de Resend:', response);
    console.log('Correo electrónico enviado exitosamente.');
  } catch (error: any) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error(`Error al enviar el correo electrónico: ${error.message}`);
  }
}
