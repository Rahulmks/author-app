'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navigationItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/books', label: 'Books' },
  { href: '/admin/podcasts', label: 'Podcasts' },
  { href: '/admin/videos', label: 'Videos' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/media', label: 'Media' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.replace('/admin/login');
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="paper-panel h-fit p-5">
          <p className="eyebrow mb-3">CMS</p>
          <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'flex min-h-11 items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-semibold transition-colors lg:justify-start',
                    isActive
                      ? 'bg-cream text-text-primary shadow-[inset_0_-2px_0_0_var(--pink)]'
                      : 'text-text-secondary hover:bg-line hover:text-text-primary',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="btn-secondary mt-6 w-full text-sm"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </aside>

        <section className="paper-panel p-5 sm:p-7">{children}</section>
      </div>
    </main>
  );
}
