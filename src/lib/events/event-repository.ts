import type { AuthorEvent } from '@/types/event';

export interface EventRepository {
  getEvents(): Promise<AuthorEvent[]>;
}
