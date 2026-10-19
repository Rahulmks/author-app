'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { navigationItems, siteConfig } from '@/lib/navigation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [postsExpanded, setPostsExpanded] = useState(pathname?.startsWith('/posts') ?? false);

  // Close menu only when route actually changes
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Handle Escape key to close menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] xl:hidden">
      {/* Backdrop */}
      <div
        className="scrim-strong fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.menuDialog')}
        className="on-surface fixed inset-y-0 right-0 z-10 flex h-full w-[85vw] max-w-sm flex-col border-l border-line bg-cream text-text-primary shadow-card"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-line p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="block font-display text-xl leading-tight text-text-primary">
                  {t('brand.name')}
                </span>
                <span className="label mt-1 block">
                  {t('brand.title')}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-mr-1 flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line bg-paper text-text-primary transition-colors hover:bg-line"
                aria-label={t('nav.closeMenu')}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              {t('brand.tagline')}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-5 sm:p-6" aria-label={t('nav.menuLinks')}>
            <ul className="space-y-2">
              {navigationItems.filter((item) => !item.hidden).map((item) => {
                const isPostsActive = item.href === '/posts' && pathname?.startsWith('/posts');
                const isActive = isPostsActive || pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`block min-h-11 flex-1 rounded-lg border border-transparent px-4 py-3 text-base font-semibold transition-colors ${
                          isActive
                            ? 'bg-paper text-highlight shadow-[inset_0_-2px_0_0_var(--pink)]'
                            : 'text-text-primary hover:bg-line hover:text-highlight'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {t(`nav.${item.key}`)}
                      </Link>
                      {item.children && (
                        <button type="button" className="min-h-11 min-w-11 rounded-lg border border-line px-3 py-3 text-text-primary hover:bg-line" onClick={() => setPostsExpanded((expanded) => !expanded)} aria-expanded={postsExpanded} aria-label={t('nav.toggleSubmenu')}>
                          {postsExpanded ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    {item.children && postsExpanded && (
                      <ul className="mt-2 space-y-1 pl-4">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href || pathname?.startsWith(`${child.href}/`);
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className={`block min-h-11 border-l-2 px-4 py-2 text-sm font-semibold hover:border-highlight hover:text-highlight ${
                                  isChildActive ? 'border-highlight text-highlight' : 'border-line text-text-secondary'
                                }`}
                                aria-current={isChildActive ? 'page' : undefined}
                              >
                                {t(`nav.${child.key}`)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Social Links */}
            <div className="mt-6 border-t border-line pt-6">
              <p className="label mb-3">
                {t('nav.social')}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {siteConfig.social.youtube && (
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line bg-paper px-3 py-2 text-text-primary transition-colors hover:bg-line"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
                  </a>
                )}
                {siteConfig.social.spotify && (
                  <a
                    href={siteConfig.social.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Spotify"
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line bg-paper px-3 py-2 text-text-primary transition-colors hover:bg-line"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" /><path d="M7.5 10.2c3.4-1 7.1-.7 9.5.8M8.1 13c2.8-.7 5.8-.4 7.8.7M8.8 15.6c2.1-.4 4.2-.2 5.7.5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line bg-paper px-3 py-2 text-text-primary transition-colors hover:bg-line"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
                  </a>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
