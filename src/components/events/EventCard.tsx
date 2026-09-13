import Link from 'next/link';
import { formatTamilDate } from '@/lib/navigation';
import { AuthorEvent } from '@/types/event';

interface EventCardProps {
  event: AuthorEvent;
}

const statusLabel: Record<AuthorEvent['status'], string> = {
  upcoming: 'வரவிருக்கும் நிகழ்வு',
  past: 'நடைபெற்ற நிகழ்வு',
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="group relative pl-6 md:pl-8 py-4 md:py-6">
      {/* Timeline Node */}
      <div className="absolute left-0 top-6 h-3 w-3 -translate-x-1.2 rounded-full border-2 border-accent bg-background group-hover:bg-accent transition-colors" />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
            <span>{statusLabel[event.status]}</span>
            <span>·</span>
            <span>{event.format}</span>
          </div>

          <h3 className="mb-1.5 text-base md:text-lg font-medium leading-snug transition-colors group-hover:text-accent">
            {event.title}
          </h3>

          <p className="mb-2 line-clamp-2 text-xs md:text-sm leading-relaxed text-text-secondary">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            <time dateTime={event.date}>{formatTamilDate(event.date, 'long')}</time>
            {event.venue && <span>· {event.venue}</span>}
            {event.city && <span>({event.city})</span>}
          </div>
        </div>

        {event.registrationUrl && (
          <div className="flex-shrink-0 md:self-center pt-1 md:pt-0">
            <Link href={event.registrationUrl} className="ink-link text-xs font-medium text-accent">
              {event.status === 'upcoming' ? 'பதிவு செய்ய' : 'குறிப்பைக் காண்க'} →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}