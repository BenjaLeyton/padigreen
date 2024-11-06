// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const {
      companyName,
      adminName,
      companyNumber,
      address,
      storeHours,
      email,
      password,
    } = await req.json();

    // Validar que todos los campos requeridos estén presentes
    if (
      !companyName ||
      !adminName ||
      !companyNumber ||
      !address ||
      !storeHours ||
      !email ||
      !password
    ) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 400 });
    }

    // Crear el usuario con rol 'user'
    const user = await createUser(
      email,
      password,
      companyName,
      adminName,
      companyNumber,
      address,
      storeHours
    );

    return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 201 });
  } catch (error: any) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ error: 'Error en el registro' }, { status: 500 });
  }
}
