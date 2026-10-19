'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link, locales, usePathname, type Locale } from '@/i18n/routing';

const labels: Record<Locale, { short: string; name: string }> = {
  ta: { short: 'TA', name: 'தமிழ்' },
  en: { short: 'EN', name: 'English' },
};

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const current = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  return (
    <div
      role="group"
      aria-label="Language / மொழி"
      className={`inline-flex items-center divide-x divide-line overflow-hidden rounded-lg border border-line text-xs font-semibold tracking-[0.08em] ${className}`}
    >
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={{ pathname, query }}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? 'true' : undefined}
            aria-label={labels[locale].name}
            className={`flex min-h-11 min-w-11 items-center justify-center px-3 transition-colors ${
              isActive ? 'bg-ink text-white' : 'text-text-secondary hover:bg-line hover:text-text-primary'
            }`}
          >
            {labels[locale].short}
          </Link>
        );
      })}
    </div>
  );
}
