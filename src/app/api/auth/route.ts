import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  authenticate,
  createSessionToken,
  getAuthDebugConfig,
  getSession,
} from '@/lib/auth/auth';

function maskEmail(email: string) {
  const [name, domain] = email.split('@');
  if (!name || !domain) {
    return 'invalid-email-format';
  }

  const visiblePrefix = name.slice(0, 2);
  return `${visiblePrefix}***@${domain}`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email?.trim();
  const password = body?.password;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const authResult = await authenticate(email, password);
  const debugConfig = getAuthDebugConfig();
  const deploymentDebug = {
    vercelEnv: process.env.VERCEL_ENV ?? 'unknown',
    vercelDeploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? 'unknown',
    region: process.env.VERCEL_REGION ?? 'unknown',
  };

  if (!authResult.isValid) {
    const debugPayload = {
      reason: authResult.reason,
      ...debugConfig,
      ...deploymentDebug,
    };

    console.error('ADMIN_AUTH_FAILED', {
      reason: authResult.reason,
      email: maskEmail(email),
      passwordLength: password.length,
      host: request.headers.get('host') ?? 'unknown-host',
      userAgent: request.headers.get('user-agent') ?? 'unknown-user-agent',
      ...debugConfig,
      ...deploymentDebug,
    });

    const response = NextResponse.json(
      {
        error: 'Invalid admin credentials.',
        debug: debugPayload,
      },
      { status: 401 },
    );
    response.headers.set('x-admin-auth-reason', authResult.reason);
    response.headers.set('x-admin-auth-deployment', deploymentDebug.vercelDeploymentId);
    return response;
  }

  console.info('ADMIN_AUTH_SUCCESS', {
    email: maskEmail(email),
    host: request.headers.get('host') ?? 'unknown-host',
    ...debugConfig,
    ...deploymentDebug,
  });

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
