import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protect dashboard APIs
  const isProtectedApi = pathname.startsWith('/api/dashboard') || 
                         pathname.startsWith('/api/staff') || 
                         pathname.startsWith('/api/menu');

  if (pathname.startsWith('/dashboard') || isProtectedApi) {
    if (!token) {
      if (isProtectedApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyToken(token) as any;
    if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'EMPLOYEE')) {
      if (isProtectedApi) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-specific checks
    const isAdminOnly = pathname.startsWith('/dashboard/staff') || 
                       pathname.startsWith('/dashboard/menu') ||
                       pathname.startsWith('/api/staff') ||
                       (pathname.startsWith('/api/menu') && request.method !== 'GET');

    if (isAdminOnly && payload.role !== 'ADMIN') {
      if (isProtectedApi) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/dashboard/:path*', '/api/staff/:path*', '/api/menu/:path*'],
};
