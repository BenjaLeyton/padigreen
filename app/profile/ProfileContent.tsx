// app/profile/ProfileContent.tsx

'use client';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';

export default function ProfileContent({ user }: { user: any }) {
  return (
    <div className="flex">
      <Sidebar role={user.role} />
      <div className="flex-1">
        <Navbar role={user.role} />
        <main className="p-8">
          <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
          <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
            <UserProfile />
          </div>
        </main>
      </div>
    </div>
  );
}
