import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(request.nextUrl.origin)
    /* return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=5`, // HttpOnly: cookie don't show to user, only next backend. max-age=20: 20sec;
      },
    }) */
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
