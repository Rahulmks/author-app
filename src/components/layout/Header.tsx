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
    <header>
      <div className="border-b border-border-color">
        <Container>
          <nav className="flex items-center justify-between gap-4 py-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8" aria-label="முதன்மை வழிசெலுத்தல்">
            <Link 
              href="/" 
              className="group block text-text-primary"
            >
              <span className="block font-display text-xl leading-tight md:text-2xl">
                {siteConfig.authorName}
              </span>
              <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent transition-opacity group-hover:opacity-80">
                {siteConfig.authorTitle}
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-7">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm font-medium tracking-[0.08em] transition-colors ${
                        isActive 
                          ? 'text-accent border-b-2 border-accent pb-1 font-semibold' 
                          : 'text-text-secondary hover:text-accent pb-1'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
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
              className="flex items-center justify-center p-2 text-text-primary transition-colors hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent lg:hidden"
              onClick={handleOpenMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
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
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        onClose={handleCloseMobileMenu} 
      />
    </header>
  );
}
