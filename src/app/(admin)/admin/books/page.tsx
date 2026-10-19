import AdminBooksManager from '@/components/admin/AdminBooksManager';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdminSession } from '@/lib/auth/auth';

export default async function AdminBooksPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <AdminBooksManager />
    </AdminShell>
  );
}
