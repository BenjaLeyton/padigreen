import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

const apiInstance = new TransactionalEmailsApi();

// Configuración de la clave de API
apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string);

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const smtpEmail = new SendSmtpEmail();

  smtpEmail.subject = 'Recuperación de Contraseña - Padigreen';
  smtpEmail.to = [{ email, name: 'Usuario' }];
  smtpEmail.htmlContent = `
    <html>
      <body>
        <h2>Recuperación de Contraseña</h2>
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" style="color: #1a73e8">${resetLink}</a>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        <p>Gracias,</p>
        <p>El equipo de Padigreen</p>
      </body>
    </html>
  `;
  smtpEmail.sender = { name: 'soporte@padigreen.cl', email: 'soporte@padigreen.cl' };

  try {
    await apiInstance.sendTransacEmail(smtpEmail);
    console.log(`Correo de restablecimiento enviado a ${email}`);
  } catch (error: any) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
}
