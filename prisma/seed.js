const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Datos del primer administrador
  const adminData1 = {
    companyName: 'Empresa Ejemplo S.A.',
    adminName: 'Administrador Principal',
    companyNumber: '123456789',
    address: 'Calle Falsa 123, Ciudad, País',
    storeHours: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    email: process.env.ADMIN_EMAIL || 'admin@tudominio.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123', // Cambia esta contraseña en producción
    role: 'admin',
  };

  // Datos del segundo administrador
  const adminData2 = {
    companyName: 'Empresa Ejemplo S.A.',
    adminName: 'Administrador Secundario',
    companyNumber: '987654321',
    address: 'Calle Verdadera 456, Ciudad, País',
    storeHours: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    email: process.env.ADMIN_EMAIL2 || 'admin2@tudominio.com',
    password: process.env.ADMIN_PASSWORD2 || 'Admin2@123', // Cambia esta contraseña en producción
    role: 'admin',
  };

  // Crear función para verificar y crear administrador
  async function createAdminIfNotExists(adminData) {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
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
    } else {
      console.log('Administrador ya existe. No se creó uno nuevo:', adminData.email);
    }
  }

  // Crear ambos administradores si no existen
  await createAdminIfNotExists(adminData1);
  await createAdminIfNotExists(adminData2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
