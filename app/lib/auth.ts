// lib/auth.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
