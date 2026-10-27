import Container from '@/components/layout/Container';
import { getTranslations } from 'next-intl/server';
import EventCard from '@/components/events/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import { eventRepository } from '@/lib/repositories';

export default async function EventsPage() {
  const t = await getTranslations('eventsPage');
  const events = await eventRepository.getEvents();
  const upcomingEvents = events
    .filter((event) => event.status === 'upcoming')
    .sort((left, right) => left.date.localeCompare(right.date));
  const pastEvents = events
    .filter((event) => event.status === 'past')
    .sort((left, right) => right.date.localeCompare(left.date));

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow mb-2">
          {t('eyebrow')}
        </p>
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">
          {t('heading')}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          {t('body')}
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <section className="paper-panel mb-10 max-w-3xl p-5 md:p-8">
          <h2 className="mb-4 border-b border-line pb-2 text-xl font-bold md:text-2xl">{t('upcomingHeading')}</h2>
          <div className="relative ml-2 border-l border-line divide-y divide-line">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section className="paper-panel max-w-3xl p-5 md:p-8">
          <h2 className="mb-4 border-b border-line pb-2 text-xl font-bold text-text-secondary md:text-2xl">{t('pastHeading')}</h2>
          <div className="relative ml-2 border-l border-line divide-y divide-line">
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