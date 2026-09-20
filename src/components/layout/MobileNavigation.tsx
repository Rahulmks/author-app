'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigationItems, siteConfig } from '@/lib/navigation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
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
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="முதன்மை வழிசெலுத்தல் பட்டியல்"
        className="fixed inset-y-0 right-0 z-10 flex h-full w-[85vw] max-w-sm flex-col border-l border-border-color bg-[#241A2E] bg-gradient-to-b from-[#2E2038] to-[#1A1225] shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-border-color p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="block font-display text-lg sm:text-xl leading-tight text-text-primary">
                  {siteConfig.authorName}
                </span>
                <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent">
                  {siteConfig.authorTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-mr-1 rounded-full border border-border-color bg-paper p-2 text-text-primary transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label="பட்டியலை மூடு"
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
            <p className="mt-3 text-xs leading-6 text-text-secondary">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-5 sm:p-6" aria-label="பட்டியல் இணைப்புகள்">
            <ul className="space-y-2">
              {navigationItems.filter((item) => !item.hidden).map((item) => {
                const isPostsActive = item.name === 'பதிவுகள்' && pathname?.startsWith('/posts');
                const isActive = isPostsActive || pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`block min-h-11 flex-1 rounded-2xl border px-4 py-3.5 text-base font-medium transition-colors ${
                          isActive
                            ? 'border-accent/40 bg-accent-soft text-accent font-semibold'
                            : 'border-transparent text-text-secondary hover:border-border-color hover:bg-paper/70 hover:text-text-primary'
                        }`}
                      >
                        {item.name}
                      </Link>
                      {item.children && (
                        <button type="button" className="min-h-11 min-w-11 rounded-xl border border-border-color px-3 py-3 text-text-secondary" onClick={() => setPostsExpanded((expanded) => !expanded)} aria-expanded={postsExpanded} aria-label="பதிவுகள் துணைப் பட்டியலைத் திறக்க">
                          {postsExpanded ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    {item.children && postsExpanded && (
                      <ul className="mt-2 space-y-1 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={onClose} className="block min-h-11 border-l border-border-color px-4 py-2 text-[15px] text-text-secondary hover:border-accent hover:text-accent">
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Social Links */}
            <div className="mt-6 border-t border-border-color pt-6">
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-secondary/70">
                சமூக வலைப்பின்னல்
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {siteConfig.social.youtube && (
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="rounded-xl border border-border-color bg-paper/50 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
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
                    className="rounded-xl border border-border-color bg-paper/50 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
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
                    className="rounded-xl border border-border-color bg-paper/50 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
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
