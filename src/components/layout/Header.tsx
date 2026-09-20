'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import Container from './Container';
import MobileNavigation from './MobileNavigation';
import { navigationItems, siteConfig } from '@/lib/navigation';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const childRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const handleOpenMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Don't show header on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header>
      <div className="border-b border-border-color">
        <Container>
          <nav ref={navigationRef} className="flex items-center justify-between gap-4 py-4 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-8" aria-label="முதன்மை வழிசெலுத்தல்">
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

            <ul className="hidden xl:flex items-center gap-6">
              {navigationItems.filter((item) => !item.hidden).map((item) => {
                const isPostsActive = item.name === 'பதிவுகள்' && pathname?.startsWith('/posts');
                const isActive = isPostsActive || pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                const isOpen = openMenu === item.href;
                
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => item.children && setOpenMenu(item.href)}
                    onMouseLeave={() => item.children && setOpenMenu(null)}
                  >
                    <Link
                      href={item.href}
                      onKeyDown={(event) => {
                        if (!item.children) return;
                        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                          event.preventDefault();
                          setOpenMenu(item.href);
                          childRefs.current[item.href]?.focus();
                        }
                        if (event.key === 'ArrowUp') {
                          event.preventDefault();
                          setOpenMenu(item.href);
                          const children = item.children;
                          childRefs.current[children[children.length - 1].href]?.focus();
                        }
                      }}
                      onClick={() => item.children && setOpenMenu(item.href)}
                      className={`whitespace-nowrap text-[15px] font-medium tracking-[0.04em] transition-colors ${
                        isActive 
                          ? 'text-accent border-b-2 border-accent pb-1 font-semibold' 
                          : 'text-text-secondary hover:text-accent pb-1'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                    {item.children && isOpen && (
                      <div className="absolute left-0 top-full z-50 pt-3" onMouseEnter={() => setOpenMenu(item.href)}>
                        <ul className="min-w-52 border border-border-color bg-paper p-2 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              ref={(element) => { childRefs.current[child.href] = element; }}
                              href={child.href}
                              onKeyDown={(event) => {
                                const index = item.children?.findIndex((entry) => entry.href === child.href) ?? -1;
                                if (event.key === 'Escape') {
                                  setOpenMenu(null);
                                } else if (event.key === 'ArrowDown') {
                                  event.preventDefault();
                                  const next = item.children?.[index + 1] ?? item.children?.[0];
                                  if (next) childRefs.current[next.href]?.focus();
                                } else if (event.key === 'ArrowUp') {
                                  event.preventDefault();
                                  const previous = item.children?.[index - 1] ?? item.children?.[item.children.length - 1];
                                  if (previous) childRefs.current[previous.href]?.focus();
                                }
                              }}
                              className="block min-h-11 whitespace-nowrap px-3 py-2 text-[15px] text-text-secondary hover:bg-accent-soft hover:text-accent"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center p-2 text-text-primary transition-colors hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent xl:hidden"
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
