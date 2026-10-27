import { Link } from '@/i18n/routing';
import Image from 'next/image';
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
              <div className="relative h-36 w-full overflow-hidden rounded-lg bg-cream md:h-24 md:w-36">
                <Image
                  src={imageSrc}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 144px"
                  className="object-cover"
                />
              </div>
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
    </article>
  );
}