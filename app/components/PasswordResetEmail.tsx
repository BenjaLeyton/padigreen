// components/PasswordResetEmail.tsx

import * as React from 'react';

export function PasswordResetEmail({ resetLink }: { resetLink: string }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', color: '#333' }}>
      <h2>Recuperación de Contraseña</h2>
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>
        Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:
        <br />
        <a href={resetLink} style={{ color: '#1a73e8' }}>{resetLink}</a>
      </p>
      <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      <p>Gracias,</p>
      <p>El equipo de Glass Collection App</p>
    </div>
  );
}
