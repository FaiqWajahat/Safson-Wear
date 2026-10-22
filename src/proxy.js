import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';

export function proxy(request) {
  const path = request.nextUrl.pathname;
  // Verify the JWT (not just cookie presence) so expired/invalid sessions can't loop between /admin and /admin/login
  const session = getAdminSession(request);

  // Protect all /admin routes except the login screen itself
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!session) {
      // Redirect unauthenticated requests to login page and drop any stale cookie
      const res = NextResponse.redirect(new URL('/admin/login', request.url));
      if (request.cookies.has('admin_session')) res.cookies.delete('admin_session');
      return res;
    }
  }

  // If already authenticated and accessing login, redirect to dashboard
  if (path === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Apply middleware exclusively to admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
