import Container from '@/components/layout/Container';
import EventCard from '@/components/events/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import { mockEvents } from '@/data/events';

export default function EventsPage() {
  const upcomingEvents = mockEvents.filter((event) => event.status === 'upcoming');
  const pastEvents = mockEvents.filter((event) => event.status === 'past');

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
          நிகழ்வுகள்
        </p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
          வாசிப்புகள், பட்டறைகள், நேரடி உரையாடல்கள்
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          வாசகர்கள், எழுத்தாளர்கள், மொழி மற்றும் நினைவை மையமாகக் கொண்ட மேடைகள் இங்கு தொகுக்கப்பட்டுள்ளன.
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold md:text-2xl text-accent border-b border-border-color/60 pb-2">வரவிருக்கும் நிகழ்வுகள்</h2>
          <div className="relative border-l border-border-color/60 ml-2 max-w-3xl divide-y divide-border-color/40">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl text-text-secondary border-b border-border-color/60 pb-2">கடந்த நிகழ்வுகள்</h2>
          <div className="relative border-l border-border-color/60 ml-2 max-w-3xl divide-y divide-border-color/40">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <EmptyState message="தற்சமயம் அறிவிக்கப்பட்ட நிகழ்வுகள் எதுவும் இல்லை. விரைவில் புதிய தேதிகள் இங்கு சேர்க்கப்படும்." />
      )}
    </Container>
  );
}