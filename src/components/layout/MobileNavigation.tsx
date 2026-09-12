'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { navigationItems, siteConfig } from '@/lib/navigation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[rgba(36,28,24,0.48)] backdrop-blur-sm md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border-color bg-[linear-gradient(180deg,rgba(249,242,232,0.98),rgba(242,232,219,0.98))] shadow-xl md:hidden">
        <div className="flex flex-col h-full">
          <div className="border-b border-border-color p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="block font-display text-xl leading-tight">{siteConfig.authorName}</span>
                <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.28em] text-text-secondary">{siteConfig.authorTitle}</span>
              </div>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 rounded-full p-2 text-text-primary"
              aria-label="பட்டியலை மூடு"
            >
              <svg
                className="w-6 h-6"
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
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              கதைகள், நினைவுகள், வாசிப்புகள் மற்றும் எழுத்தின் மெதுவான ஒலிகள்.
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-2xl border px-4 py-4 text-base font-medium transition-colors ${
                        isActive
                            ? 'border-[rgba(138,90,60,0.28)] bg-accent-soft text-accent'
                            : 'border-transparent text-text-secondary hover:border-border-color hover:bg-[rgba(255,250,242,0.8)] hover:text-text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
