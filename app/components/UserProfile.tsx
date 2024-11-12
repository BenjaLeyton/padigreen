// app/components/UserProfile.tsx

'use client';

import { useEffect, useState } from 'react';

interface User {
  email: string;
  companyName: string;
  adminName: string;
  companyNumber: string;
  address: string;
  storeHours: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/me');
      const data = await res.json();
      setUser(data);
      setFormData(data); // Inicializar formData con los datos actuales
    }
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (formData) {
      const res = await fetch('/api/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        console.error('Error al actualizar el perfil');
      }
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (!user || !formData) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="p-8 bg-white rounded shadow-md">
      {!isEditing ? (
        <>
          <h2 className="text-xl font-bold mb-4">Perfil de Usuario</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Nombre de la Empresa:</strong> {user.companyName}
          </p>
          <p>
            <strong>Nombre del Administrador:</strong> {user.adminName}
          </p>
          <p>
            <strong>Número de la Empresa:</strong> {user.companyNumber}
          </p>
          <p>
            <strong>Dirección:</strong> {user.address}
          </p>
          <p>
            <strong>Horario de Atención:</strong> {user.storeHours}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Editar Perfil
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
          <form>
            {/* Email (solo lectura) */}
            <div className="mb-4">
              <label className="block font-bold">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            {/* Campos editables */}
            <div className="mb-4">
              <label className="block font-bold">Nombre de la Empresa:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Nombre del Administrador:</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Número de la Empresa:</label>
              <input
                type="text"
                name="companyNumber"
                value={formData.companyNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Dirección:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Horario de Atención:</label>
              <input
                type="text"
                name="storeHours"
                value={formData.storeHours}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            {/* Botones Guardar y Cancelar */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
