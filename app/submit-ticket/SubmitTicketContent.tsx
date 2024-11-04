// app/submit-ticket/SubmitTicketContent.tsx
'use client';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TicketForm from '../components/TicketForm';

export default function SubmitTicketContent({ email, role }: { email: string; role: string }) {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1">
        <Navbar role={role} />
        <main className="p-8">
          <TicketForm email={email} />
        </main>
      </div>
    </div>
  );
}
