// app/submit-ticket/SubmitTicketContent.tsx
'use client';

import TicketForm from '../components/TicketForm';

export default function SubmitTicketContent({ user }: { user: any }) {
  return (
    <div className="flex">
      {/* Incluimos Navbar y Sidebar si es necesario */}
      <main className="flex-1 p-8">
        <TicketForm user={user} />
      </main>
    </div>
  );
}
