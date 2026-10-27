import { mockEvents } from '@/data/events';
import type { AuthorEvent } from '@/types/event';

import type { EventRepository } from '@/lib/events/event-repository';

export class MockEventRepository implements EventRepository {
  async getEvents(): Promise<AuthorEvent[]> {
    return mockEvents;
  }
}
