'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { navigationItems, siteConfig } from '@/lib/navigation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

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
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`block rounded-2xl border px-4 py-3.5 text-base font-medium transition-colors ${
                        isActive
                          ? 'border-accent/40 bg-accent-soft text-accent font-semibold'
                          : 'border-transparent text-text-secondary hover:border-border-color hover:bg-paper/70 hover:text-text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Additional Links */}
            <div className="mt-6 border-t border-border-color pt-6">
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-secondary/70">
                கூடுதல் பக்கங்கள்
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/about"
                  onClick={onClose}
                  className={`rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                    pathname === '/about'
                      ? 'border-accent/40 bg-accent-soft text-accent'
                      : 'border-border-color bg-paper/50 text-text-secondary hover:text-text-primary hover:border-accent/50'
                  }`}
                >
                  அறிமுகம்
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className={`rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                    pathname === '/contact'
                      ? 'border-accent/40 bg-accent-soft text-accent'
                      : 'border-border-color bg-paper/50 text-text-secondary hover:text-text-primary hover:border-accent/50'
                  }`}
                >
                  தொடர்பு
                </Link>
              </div>
            </div>

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
                    className="rounded-xl border border-border-color bg-paper/50 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    YouTube
                  </a>
                )}
                {siteConfig.social.spotify && (
                  <a
                    href={siteConfig.social.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-border-color bg-paper/50 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    Spotify
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-border-color bg-paper/50 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    Instagram
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
