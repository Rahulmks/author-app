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
    <article className="group border-t border-border-color py-7 md:py-8">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-accent">
        <span>{statusLabel[event.status]}</span>
        <span>•</span>
        <span>{event.format}</span>
      </div>

      <h3 className="mb-3 text-2xl font-medium leading-snug transition-colors group-hover:text-accent">
        {event.title}
      </h3>

      <p className="mb-6 text-sm leading-7 text-text-secondary md:text-base">
        {event.description}
      </p>

      <div className="space-y-2 border-t border-border-color pt-4 text-sm text-text-secondary">
        <p>{formatTamilDate(event.date, 'long')}</p>
        <p>{event.venue}</p>
        <p>{event.city}</p>
      </div>

      {event.registrationUrl && (
        <div className="mt-5">
          <Link href={event.registrationUrl} className="ink-link text-sm font-medium text-accent">
            {event.status === 'upcoming' ? 'பங்கேற்பதற்குப் பதிவு செய்ய' : 'நிகழ்வு குறிப்பைப் பார்க்க'}
          </Link>
        </div>
      )}
    </article>
  );
}