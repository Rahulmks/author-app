export type EventStatus = 'upcoming' | 'past';

export interface AuthorEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  venue: string;
  city: string;
  format: string;
  status: EventStatus;
  registrationUrl?: string;
  imageUrl?: string;
}