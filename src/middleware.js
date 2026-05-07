import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Define public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup', '/live'];
  const isPublicPath = publicPaths.some(path => 
    pathname === path || (path !== '/' && pathname.startsWith(path))
  );

  // Check for the user cookie
  const userCookie = request.cookies.get('user');

  // If not authenticated and trying to access a private path, redirect to login
  if (!userCookie && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access login/signup, redirect to dashboard
  // We allow authenticated users to stay on the homepage ('/')
  if (userCookie && (pathname === '/login' || pathname === '/signup')) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie.value));
      const targetPath = user.role === 'teacher' ? '/teacher' : '/principal';
      return NextResponse.redirect(new URL(targetPath, request.url));
    } catch (e) {
      const response = NextResponse.next();
      response.cookies.delete('user');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any file with an extension (e.g. .png, .jpg, .svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
