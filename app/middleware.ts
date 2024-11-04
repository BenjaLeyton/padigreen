// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  const protectedPaths = ['/home', '/submit-ticket', '/admin-dashboard'];

  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    if (!token || !verifyToken(token)) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/submit-ticket/:path*', '/admin-dashboard/:path*'],
};
