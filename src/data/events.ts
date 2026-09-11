import { AuthorEvent } from '@/types/event';

export const mockEvents: AuthorEvent[] = [
  {
    id: '1',
    title: 'நினைவு மற்றும் நகரம்: எழுத்து வாசிப்பு மாலை',
    slug: 'memory-and-city-reading-evening',
    description:
      'புதிய கட்டுரைகள், நகர நினைவுகள், வாசிப்பின் உட்புற அமைதி குறித்து நடைபெறும் நேரடி வாசிப்பு மற்றும் உரையாடல்.',
    date: '2026-10-02',
    venue: 'தமிழ் இலக்கிய மையம்',
    city: 'சென்னை',
    format: 'நேரடி நிகழ்வு',
    status: 'upcoming',
    registrationUrl: '#',
  },
  {
    id: '2',
    title: 'Bilingual Craft Session: Tamil, English, and Voice',
    slug: 'bilingual-craft-session',
    description:
      'A workshop conversation on rhythm, translation, and sustaining a literary voice across languages.',
    date: '2026-10-18',
    venue: 'Writers Forum Studio',
    city: 'பெங்களூரு',
    format: 'பட்டறை',
    status: 'upcoming',
    registrationUrl: '#',
  },
  {
    id: '3',
    title: 'குடும்ப வரலாறும் கற்பனையும்',
    slug: 'family-history-and-fiction',
    description:
      'குடும்ப நினைவுகள் இலக்கிய வடிவமாக மாறும் தருணங்களைப் பற்றிய உரையாடல் மற்றும் கேள்வி-பதில்.',
    date: '2026-08-14',
    venue: 'சிற்றிதழ் வாசகர் வளாகம்',
    city: 'மதுரை',
    format: 'உரையாடல்',
    status: 'past',
    registrationUrl: '#',
  },
];

export function getUpcomingEvents() {
  return mockEvents
    .filter((event) => event.status === 'upcoming')
    .sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime());
}