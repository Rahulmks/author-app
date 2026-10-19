import AdminShell from '@/components/admin/AdminShell';
import AdminVideosManager from '@/components/admin/AdminVideosManager';
import { requireAdminSession } from '@/lib/auth/auth';

export default async function AdminVideosPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <AdminVideosManager />
    </AdminShell>
  );
}
