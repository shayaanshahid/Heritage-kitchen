import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protect /dashboard and its subroutes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyToken(token) as any;
    if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'EMPLOYEE')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-specific checks
    if (pathname.startsWith('/dashboard/staff') || pathname.startsWith('/dashboard/menu')) {
        if (payload.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
