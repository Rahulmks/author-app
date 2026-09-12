import { getSession } from '@/lib/auth/auth';

export async function canManageContent() {
  const session = await getSession();
  return Boolean(session);
}
