import AdminMediaUploader from '@/components/admin/AdminMediaUploader';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdminSession } from '@/lib/auth/auth';

export default async function AdminMediaPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <AdminMediaUploader />
    </AdminShell>
  );
}
