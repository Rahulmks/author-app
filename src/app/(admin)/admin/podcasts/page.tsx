import AdminPodcastsManager from '@/components/admin/AdminPodcastsManager';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdminSession } from '@/lib/auth/auth';

export default async function AdminPodcastsPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <AdminPodcastsManager />
    </AdminShell>
  );
}
