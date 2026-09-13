import Container from '@/components/layout/Container';
import EventCard from '@/components/events/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import { mockEvents } from '@/data/events';

export default function EventsPage() {
  const upcomingEvents = mockEvents.filter((event) => event.status === 'upcoming');
  const pastEvents = mockEvents.filter((event) => event.status === 'past');

  return (
    <Container className="py-12 md:py-20">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow mb-4">
          நிகழ்வுகள்
        </p>
        <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
          வாசிப்புகள், பட்டறைகள், நேரடி உரையாடல்கள்
        </h1>
        <p className="text-lg leading-8 text-text-secondary">
          வாசகர்கள், எழுத்தாளர்கள், மொழி மற்றும் நினைவை மையமாகக் கொண்ட மேடைகள் இங்கு தொகுக்கப்பட்டுள்ளன.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
          <span className="border-b border-border-color pb-1 text-xs font-medium uppercase tracking-[0.08em] text-text-secondary">
            வரவிருக்கும் நிகழ்வுகள்
          </span>
          <span className="border-b border-border-color pb-1 text-xs font-medium uppercase tracking-[0.08em] text-text-secondary">
            கடந்த நிகழ்வுகள்
          </span>
        </div>
      </div>

      {upcomingEvents.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold md:text-3xl">வரவிருக்கும் நிகழ்வுகள்</h2>
          <div className="max-w-3xl">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section>
          <h2 className="mb-5 text-2xl font-semibold md:text-3xl">கடந்த நிகழ்வுகள்</h2>
          <div className="max-w-3xl">
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