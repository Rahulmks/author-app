import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['ta', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ta';

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeCookie: { name: 'NEXT_LOCALE', maxAge: 60 * 60 * 24 * 365 },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
