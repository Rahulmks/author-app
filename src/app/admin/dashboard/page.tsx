import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdminSession } from '@/lib/auth/auth';

const cards = [
  {
    href: '/admin/posts',
    title: 'Posts',
    description: 'Write, edit, publish, and manage drafts.',
  },
  {
    href: '/admin/books',
    title: 'Books',
    description: 'Update your books catalog and details.',
  },
  {
    href: '/admin/podcasts',
    title: 'Podcasts',
    description: 'Add and curate podcast episodes.',
  },
  {
    href: '/admin/videos',
    title: 'Videos',
    description: 'Manage all video entries and metadata.',
  },
  {
    href: '/admin/media',
    title: 'Media Uploads',
    description: 'Upload images and copy generated paths.',
  },
];

export default async function AdminDashboardPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <div>
        <h2 className="mb-3 text-3xl font-semibold">Dashboard</h2>
        <p className="mb-6 text-text-secondary">Choose a section to create and manage your content.</p>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="rounded-2xl border border-border-color bg-paper/70 p-5 transition hover:border-accent">
              <h3 className="mb-2 text-xl font-semibold">{card.title}</h3>
              <p className="text-sm text-text-secondary">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
