// lib/db.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser(email: string, password: string, role: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function savePasswordResetToken(userId: number, token: string) {
  // Guardar el token en la base de datos con una fecha de expiración
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + 3600 * 1000), // Expira en 1 hora
    },
  });
}

export async function findUserByPasswordResetToken(token: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return null;
  }

  return resetToken.user;
}

export async function deletePasswordResetToken(token: string) {
  await prisma.passwordResetToken.delete({
    where: { token },
  });
}

export async function updateUserPassword(userId: number, newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}

// lib/db.ts

// ... código existente ...

export async function createTicket(userId: number, containerType: string, location: string) {
  return prisma.ticket.create({
    data: {
      containerType,
      location,
      userId,
    },
  });
}

export async function getAllTickets() {
  return prisma.ticket.findMany({
    include: {
      user: true,
    },
  });
}

export async function updateTicketStatus(ticketId: number, status: string) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status },
  });
}
