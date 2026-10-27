import AdminEventsManager from '@/components/admin/AdminEventsManager';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdminSession } from '@/lib/auth/auth';

export default async function AdminEventsPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <AdminEventsManager />
    </AdminShell>
  );
}
