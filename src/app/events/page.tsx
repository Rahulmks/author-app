import Container from '@/components/layout/Container';
import EventCard from '@/components/events/EventCard';
import { mockEvents } from '@/data/events';

export default function EventsPage() {
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
      </div>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Container>
  );
}