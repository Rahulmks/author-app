import { NextResponse } from 'next/server';
import { mockEvents } from '@/data/events';
import { getJsonObject } from '@/lib/aws/s3-read';
import { isS3Configured } from '@/lib/aws/s3-client';
import { putJsonObject } from '@/lib/aws/s3-write';
import { requireAdminSession } from '@/lib/auth/auth';
import { revalidateEvents } from '@/lib/cache/revalidate';
import { eventRepository } from '@/lib/repositories';
import type { AuthorEvent, EventStatus } from '@/types/event';

const EVENTS_INDEX_KEY = 'events/index.json';

function toOptionalString(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function normalizeEventStatus(value: unknown): EventStatus {
  if (value !== 'upcoming' && value !== 'past') {
    throw new Error('Status must be upcoming or past.');
  }
  return value;
}

function normalizeEvent(input: Record<string, unknown>, existing?: AuthorEvent): AuthorEvent {
  const title = toOptionalString(input.title);
  const date = toOptionalString(input.date);
  const format = toOptionalString(input.format);

  if (!title) {
    throw new Error('Title is required.');
  }

  const parsedDate = date ? new Date(`${date}T00:00:00.000Z`) : null;
  if (
    !date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !parsedDate ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error('A valid event date is required.');
  }

  if (!format) {
    throw new Error('Format is required.');
  }

  const slug = toOptionalString(input.slug) ?? toSlug(title);
  const imageUrl = Object.prototype.hasOwnProperty.call(input, 'imageUrl')
    ? toOptionalString(input.imageUrl)
    : existing?.imageUrl;

  return {
    id: existing?.id ?? `event-${crypto.randomUUID()}`,
    title,
    slug: slug || `event-${Date.now()}`,
    description: toOptionalString(input.description) ?? '',
    date,
    venue: toOptionalString(input.venue) ?? '',
    city: toOptionalString(input.city) ?? '',
    format,
    status: normalizeEventStatus(input.status),
    registrationUrl: toOptionalString(input.registrationUrl),
    imageUrl,
  };
}

async function loadEventsForWrite() {
  if (isS3Configured()) {
    return (await getJsonObject<AuthorEvent[]>(EVENTS_INDEX_KEY)) ?? [];
  }

  return mockEvents;
}

async function persistEvents(events: AuthorEvent[]) {
  if (isS3Configured()) {
    await putJsonObject(EVENTS_INDEX_KEY, events);
    return;
  }

  mockEvents.splice(0, mockEvents.length, ...events);
}

export async function GET() {
  await requireAdminSession();

  const events = await eventRepository.getEvents();
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const events = await loadEventsForWrite();
    const event = normalizeEvent(body);
    events.push(event);
    await persistEvents(events);
    revalidateEvents();
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create event.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const id = typeof body?.id === 'string' ? body.id : undefined;

  if (!body || !id) {
    return NextResponse.json({ error: 'Event id is required.' }, { status: 400 });
  }

  const events = await loadEventsForWrite();
  const index = events.findIndex((event) => event.id === id);

  if (index < 0) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
  }

  try {
    const updated = normalizeEvent(body, events[index]);
    events[index] = updated;
    await persistEvents(events);
    revalidateEvents();
    return NextResponse.json({ event: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update event.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id) {
    return NextResponse.json({ error: 'Event id is required.' }, { status: 400 });
  }

  const events = await loadEventsForWrite();
  const nextEvents = events.filter((event) => event.id !== id);

  if (nextEvents.length === events.length) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
  }

  await persistEvents(nextEvents);
  revalidateEvents();
  return NextResponse.json({ success: true });
}
