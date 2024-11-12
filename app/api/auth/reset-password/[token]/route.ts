import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';
import {
  findUserByPasswordResetToken,
  deletePasswordResetToken,
  updateUserPassword,
} from '../../../../lib/db';

export async function POST(req: Request, { params }: { params: { token: string } }) {
  const { token } = await params;  // Esperar a que 'params' esté disponible

  const { password } = await req.json();

  if (!password) {
    return NextResponse.json(
      { error: 'Por favor, proporciona una nueva contraseña' },
      { status: 400 }
    );
  }

  // Verificar el token
  const payload = verifyToken(token);
  if (!payload || typeof payload === 'string') {
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 400 });
  }

  // Encontrar usuario asociado al token
  const user = await findUserByPasswordResetToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 400 });
  }

  // Actualizar la contraseña del usuario
  await updateUserPassword(user.id, password);

  // Eliminar el token de restablecimiento
  await deletePasswordResetToken(token);

  return NextResponse.json({ message: 'Contraseña actualizada correctamente' });
}
