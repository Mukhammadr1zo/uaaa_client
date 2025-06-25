// src/middleware.js

import { NextResponse } from 'next/server';
 
export function middleware(request) {
  // Admin routes check
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Only run this code on the client side
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('isAuthenticated');
      if (auth !== 'true') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    // Skip middleware in server context
    return NextResponse.next();
  }
  
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/admin/dashboard/:path*'],
}