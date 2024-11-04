// app/submit-ticket/SubmitTicketContent.tsx
'use client';

export default function SubmitTicketContent({ email }: { email: string }) {
  return (
    <div>
      <h1>Reportar Contenedor Lleno</h1>
      <p>Usuario: {email}</p>
      {/* Aquí va tu componente TicketForm */}
    </div>
  );
}
