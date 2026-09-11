'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Container from './Container';
import MobileNavigation from './MobileNavigation';
import { navigationItems, siteConfig } from '@/lib/navigation';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Don't show header on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-color bg-[rgba(248,240,229,0.78)] backdrop-blur-md">
      <Container>
        <nav className="flex items-center justify-between gap-6 py-4 md:py-5">
          <Link 
            href="/" 
            className="group block text-text-primary"
          >
            <span className="block font-display text-xl md:text-2xl leading-tight">
              {siteConfig.authorName}
            </span>
            <span className="mt-1 block text-[0.68rem] font-medium uppercase tracking-[0.28em] text-text-secondary transition-colors group-hover:text-accent">
              {siteConfig.authorTitle}
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname?.startsWith(item.href));
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`ink-link text-sm font-medium tracking-[0.08em] transition-colors ${
                      isActive 
                        ? 'text-text-primary' 
                        : 'text-text-secondary hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden rounded-full border border-border-color bg-paper px-3 py-2 text-text-primary"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="பட்டியலைத் திறக்க"
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
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
}
