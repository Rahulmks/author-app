import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const ADMIN_SESSION_COOKIE = 'author_admin_session';

const DEFAULT_ADMIN_EMAIL = 'admin@example.com';
const DEFAULT_ADMIN_PASSWORD = 'change-me';
const DEFAULT_SESSION_SECRET = 'local-dev-secret-change-this';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface AdminSession {
  email: string;
  authenticatedAt: string;
  expiresAt: string;
}

interface SessionPayload {
  email: string;
  issuedAt: number;
  expiresAt: number;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? DEFAULT_SESSION_SECRET;
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function sha256Hex(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

function encodePayload(payload: SessionPayload) {
  const base64Payload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = sign(base64Payload);
  return `${base64Payload}.${signature}`;
}

function decodePayload(token: string): SessionPayload | null {
  const [base64Payload, signature] = token.split('.');

  if (!base64Payload || !signature) {
    return null;
  }

  const expectedSignature = sign(base64Payload);
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const actualBuffer = Buffer.from(signature, 'utf8');

  if (expectedBuffer.length !== actualBuffer.length || !timingSafeEqual(expectedBuffer, actualBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf8')) as SessionPayload;
    if (!payload.email || !payload.issuedAt || !payload.expiresAt) {
      return null;
    }

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function authenticate(email: string, password: string) {
  const isProduction = process.env.NODE_ENV === 'production';
  const expectedEmail = (process.env.ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL).trim();
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim();
  const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim().toLowerCase();

  const normalizedEmailMatches = email.trim().toLowerCase() === expectedEmail.toLowerCase();

  if (!normalizedEmailMatches) {
    return false;
  }

  if (expectedPasswordHash) {
    return sha256Hex(password) === expectedPasswordHash;
  }

  if (expectedPassword) {
    return password === expectedPassword;
  }

  if (isProduction) {
    return false;
  }

  return password === DEFAULT_ADMIN_PASSWORD;
}

export function createSessionToken(email: string) {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_TTL_MS;

  return encodePayload({
    email,
    issuedAt,
    expiresAt,
  });
}

export async function getSession(): Promise<AdminSession | null> {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  const payload = decodePayload(token);
  if (!payload) {
    return null;
  }

  return {
    email: payload.email,
    authenticatedAt: new Date(payload.issuedAt).toISOString(),
    expiresAt: new Date(payload.expiresAt).toISOString(),
  };
}

export async function requireAdminSession() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return session;
}
