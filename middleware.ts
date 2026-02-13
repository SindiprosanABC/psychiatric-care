import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protege rotas /admin (exceto /admin/login)
        if (req.nextUrl.pathname.startsWith('/admin')) {
          if (req.nextUrl.pathname === '/admin/login') {
            return true;
          }
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
