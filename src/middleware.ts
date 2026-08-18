import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = path.startsWith('/admin');
  const isLoginRoute = path === '/admin/login';
  const isApiAuthRoute = path.startsWith('/api/admin/auth'); // Allow login API

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (isLoginRoute || isApiAuthRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const payload = await verifyToken(token);

  if (!payload) {
    // Invalid token, redirect to login and clear cookie
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_token');
    return response;
  }

  // Token is valid, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
