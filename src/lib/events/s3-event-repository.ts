import 'server-only';

import { getJsonObject } from '@/lib/aws/s3-read';
import type { AuthorEvent } from '@/types/event';

import type { EventRepository } from '@/lib/events/event-repository';

const EVENTS_INDEX_KEY = 'events/index.json';

export class S3EventRepository implements EventRepository {
  async getEvents(): Promise<AuthorEvent[]> {
    return (await getJsonObject<AuthorEvent[]>(EVENTS_INDEX_KEY)) ?? [];
  }
}
