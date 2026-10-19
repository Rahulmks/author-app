import Container from '@/components/layout/Container';
import { getTranslations } from 'next-intl/server';
import EventCard from '@/components/events/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import { mockEvents } from '@/data/events';

export default async function EventsPage() {
  const t = await getTranslations('eventsPage');
  const upcomingEvents = mockEvents.filter((event) => event.status === 'upcoming');
  const pastEvents = mockEvents.filter((event) => event.status === 'past');

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
          {t('eyebrow')}
        </p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
          {t('heading')}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          {t('body')}
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold md:text-2xl text-accent border-b border-border-color/60 pb-2">{t('upcomingHeading')}</h2>
          <div className="relative border-l border-border-color/60 ml-2 max-w-3xl divide-y divide-border-color/40">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl text-text-secondary border-b border-border-color/60 pb-2">{t('pastHeading')}</h2>
          <div className="relative border-l border-border-color/60 ml-2 max-w-3xl divide-y divide-border-color/40">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <EmptyState message={t('empty')} />
      )}
    </Container>
  );
}