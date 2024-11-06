// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Datos del administrador
  const adminData = {
    companyName: 'Empresa Ejemplo S.A.',
    adminName: 'Administrador Principal',
    companyNumber: '123456789',
    address: 'Calle Falsa 123, Ciudad, País',
    storeHours: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    email: process.env.ADMIN_EMAIL || 'admin@tudominio.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123', // Cambia esta contraseña en producción
    role: 'admin',
  };

  // Verificar si el administrador ya existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminData.email },
  });

  if (existingAdmin) {
    console.log('Administrador ya existe. No se creó uno nuevo.');
    return;
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(adminData.password, 10);

  // Crear el administrador
  const admin = await prisma.user.create({
    data: {
      companyName: adminData.companyName,
      adminName: adminData.adminName,
      companyNumber: adminData.companyNumber,
      address: adminData.address,
      storeHours: adminData.storeHours,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
    },
  });

  console.log('Administrador creado exitosamente:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
