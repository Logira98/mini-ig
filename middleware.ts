import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get('sessionUser');

  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  if (!session && pathname !== '/login') {
    const url = req.nextUrl.clone(); url.pathname = '/login'; return NextResponse.redirect(url);
  }
  if (session && pathname === '/login') {
    const url = req.nextUrl.clone(); url.pathname = '/feed'; return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
