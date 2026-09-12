import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  authenticate,
  createSessionToken,
  getSession,
} from '@/lib/auth/auth';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email?.trim();
  const password = body?.password;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const isValid = await authenticate(email, password);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  const token = createSessionToken(email);
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export async function GET() {
  const session = await getSession();

  return NextResponse.json({
    authenticated: Boolean(session),
    session,
  });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
