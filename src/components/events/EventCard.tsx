'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/lib/navigation';
import { resolveImagePath } from '@/lib/media/resolve-image-path';
import { AuthorEvent } from '@/types/event';

interface EventCardProps {
  event: AuthorEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const t = useTranslations('events');
  const locale = useLocale();
  const imageSrc = resolveImagePath(event.imageUrl);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (!isImageOpen) {
      return;
    }

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        setIsImageOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageOpen]);

  return (
    <article className="group relative pl-6 md:pl-8 py-4 md:py-6">
      {/* Timeline Node */}
      <div className="absolute left-0 top-6 h-3 w-3 -translate-x-1.2 rounded-full border-2 border-highlight bg-paper transition-colors group-hover:bg-highlight" />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="label mb-1 flex flex-wrap items-center gap-2">
            <span>{t(event.status)}</span>
            <span>·</span>
            <span>{event.format}</span>
          </div>

          <h3 className="mb-1.5 text-base font-semibold leading-snug md:text-lg">
            {event.title}
          </h3>

          <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
            <time dateTime={event.date}>{formatDate(event.date, locale, 'long')}</time>
            {event.venue && <span>· {event.venue}</span>}
            {event.city && <span>({event.city})</span>}
          </div>
        </div>

        {(imageSrc || event.registrationUrl) && (
          <div className="flex flex-shrink-0 flex-col gap-2 md:items-end">
            {imageSrc && (
              <button
                type="button"
                onClick={() => setIsImageOpen(true)}
                aria-label={`View full image: ${event.title}`}
                className="relative block h-48 w-full overflow-hidden rounded-lg bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight md:h-36 md:w-48"
              >
                <Image
                  src={imageSrc}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  className="object-contain"
                />
              </button>
            )}
            {event.registrationUrl && (
              <div className="pt-1 md:pt-0">
                <Link href={event.registrationUrl} className="ink-link inline-flex min-h-11 items-center text-sm">
                  {event.status === 'upcoming' ? t('register') : t('viewNotes')} →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {imageSrc && isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Full image: ${event.title}`}
            className="relative flex h-full w-full items-center justify-center"
            onClick={(clickEvent) => clickEvent.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              aria-label="Close image"
              className="absolute right-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <Image
              src={imageSrc}
              alt={event.title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </article>
  );
}