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
    <article className="group hover-lift border border-border-color p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-border-color pb-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-accent">
            {statusLabel[event.status]}
          </p>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary">{event.format}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl leading-none text-text-primary">{new Date(event.date).getDate()}</p>
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-text-secondary">{new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(event.date)).toUpperCase()}</p>
        </div>
      </div>

      <h3 className="mb-3 text-2xl font-semibold leading-tight transition-colors group-hover:text-accent">
        {event.title}
      </h3>

      <p className="mb-5 text-base leading-7 text-text-secondary">{event.description}</p>

      <div className="space-y-2 border-t border-border-color pt-4 text-sm text-text-secondary">
        <p>{formatTamilDate(event.date, 'long')}</p>
        <p>{event.venue}</p>
        <p>{event.city}</p>
      </div>

      {event.registrationUrl && (
        <div className="mt-5">
          <Link href={event.registrationUrl} className="ink-link text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {event.status === 'upcoming' ? 'Register' : 'Details'}
          </Link>
        </div>
      )}
    </article>
  );
}