// lib/db.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const prisma = new PrismaClient();

// Funciones relacionadas con usuarios

export async function createUser(
  email: string,
  password: string,
  companyName: string,
  adminName: string,
  companyNumber: string,
  address: string,
  storeHours: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'user',
      companyName,
      adminName,
      companyNumber,
      address,
      storeHours,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function updateUserPassword(userId: number, newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}

// Funciones relacionadas con tokens de restablecimiento de contraseña

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

// Funciones relacionadas con tickets

export async function createTicket(
  userId: number,
  containerType: string,
  comments?: string
) {
  return prisma.ticket.create({
    data: {
      containerType,
      comments,
      userId,
    },
  });
}

export async function getAllTickets() {
  return prisma.ticket.findMany({
    where: { deleted: false },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getUserTickets(userId: number) {
  return prisma.ticket.findMany({
    where: {
      userId,
      deleted: false,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function updateTicketStatus(ticketId: number, status: string) {
  return prisma.ticket.update({
    where: { id: ticketId },
    include: { user: true },
    data: { status },
  });
}

export async function deleteTicket(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { deleted: true },
  });
}

export async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { user: true },
  });
}
