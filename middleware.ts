import { updateSession } from '@/action';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const authPath = path === '/login' || path === '/register';

  const token = request.cookies.get('session')?.value || '';

  if (authPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!authPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  // validate cookie and update expiry on route change
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/profile',
    '/players',
    '/tweets',
    '/friends',
    '/login',
    '/register',
    '/chat'
  ]
};
