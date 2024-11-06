// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    companyNumber: '',
    address: '',
    storeHours: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Error al registrar');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Registro de Empresa</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <input
          type="text"
          name="companyName"
          placeholder="Nombre de la empresa"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="adminName"
          placeholder="Nombre del administrador"
          value={formData.adminName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="companyNumber"
          placeholder="Número de la empresa"
          value={formData.companyNumber}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="storeHours"
          placeholder="Horario del local"
          value={formData.storeHours}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button className="w-full p-2 text-white bg-blue-500 rounded" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

