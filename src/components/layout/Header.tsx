'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import Container from './Container';
import MobileNavigation from './MobileNavigation';
import { navigationItems, siteConfig } from '@/lib/navigation';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);
  
  // Don't show header on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-color bg-[#1A1225]/90 backdrop-blur-[2px]">
      <Container>
        <nav className="flex items-center justify-between gap-4 py-4" aria-label="முதன்மை வழிசெலுத்தல்">
          <Link href="/" className="group inline-flex flex-col text-left">
            <span className="font-display text-xl leading-none text-text-primary md:text-2xl">
              {siteConfig.authorName}
            </span>
            <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {siteConfig.authorTitle}
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`ink-link text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors ${
                      isActive ? 'text-text-primary' : 'text-text-secondary hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="flex items-center justify-center rounded-none border border-border-color bg-transparent p-2 text-text-primary transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 lg:hidden"
            onClick={handleOpenMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="பட்டியலைத் திறக்க"
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </Container>

      <MobileNavigation isOpen={mobileMenuOpen} onClose={handleCloseMobileMenu} />
    </header>
  );
}
