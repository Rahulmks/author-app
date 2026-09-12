import AdminPostsManager from '@/components/admin/AdminPostsManager';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdminSession } from '@/lib/auth/auth';

export default async function AdminPostsPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <AdminPostsManager />
    </AdminShell>
  );
}
