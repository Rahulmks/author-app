'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminImageFieldUploader from '@/components/admin/AdminImageFieldUploader';

interface EventRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  venue: string;
  city: string;
  format: string;
  status: 'upcoming' | 'past';
  registrationUrl?: string;
  imageUrl?: string;
}

interface EventFormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  venue: string;
  city: string;
  format: string;
  status: 'upcoming' | 'past';
  registrationUrl: string;
  imageUrl: string;
}

const initialForm: EventFormState = {
  title: '',
  slug: '',
  description: '',
  date: '',
  venue: '',
  city: '',
  format: '',
  status: 'upcoming',
  registrationUrl: '',
  imageUrl: '',
};

export default function AdminEventsManager() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [form, setForm] = useState<EventFormState>(initialForm);
  const [imageUploaderKey, setImageUploaderKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/events', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load events.');
      }

      const payload = (await response.json()) as { events?: EventRecord[] };
      setEvents(payload.events ?? []);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchEvents();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/events', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const details = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(details?.error ?? 'Unable to save event.');
      }

      await fetchEvents();
      setForm(initialForm);
      setImageUploaderKey((key) => key + 1);
      setMessage(form.id ? 'Event updated.' : 'Event created.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save event.');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (event: EventRecord) => {
    setImageUploaderKey((key) => key + 1);
    setForm({
      id: event.id,
      title: event.title,
      slug: event.slug ?? '',
      description: event.description ?? '',
      date: event.date,
      venue: event.venue ?? '',
      city: event.city ?? '',
      format: event.format,
      status: event.status,
      registrationUrl: event.registrationUrl ?? '',
      imageUrl: event.imageUrl ?? '',
    });
    setMessage(null);
    setError(null);
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this event?')) {
      return;
    }

    setError(null);
    const response = await fetch('/api/events', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const details = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(details?.error ?? 'Unable to delete event.');
      return;
    }

    if (form.id === id) {
      setForm(initialForm);
      setImageUploaderKey((key) => key + 1);
    }

    await fetchEvents();
    setMessage('Event deleted.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Events</h2>
        <p className="text-sm text-text-secondary">Create and manage events shown on the public events page.</p>
      </div>

      <form className="grid gap-4 rounded-xl border border-line p-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="event-title" className="mb-1 block text-sm text-text-secondary">Title</label>
            <input id="event-title" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.title} required onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} />
          </div>
          <div>
            <label htmlFor="event-slug" className="mb-1 block text-sm text-text-secondary">Slug</label>
            <input id="event-slug" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} placeholder="auto-generated if empty" />
          </div>
        </div>

        <div>
          <label htmlFor="event-description" className="mb-1 block text-sm text-text-secondary">Description</label>
          <textarea id="event-description" className="w-full rounded-lg border border-line bg-cream px-3 py-2" rows={3} value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="event-date" className="mb-1 block text-sm text-text-secondary">Date</label>
            <input id="event-date" type="date" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.date} required onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))} />
          </div>
          <div>
            <label htmlFor="event-format" className="mb-1 block text-sm text-text-secondary">Format</label>
            <input id="event-format" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.format} required onChange={(event) => setForm((prev) => ({ ...prev, format: event.target.value }))} placeholder="Workshop, talk, reading..." />
          </div>
          <div>
            <label htmlFor="event-status" className="mb-1 block text-sm text-text-secondary">Status</label>
            <select id="event-status" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as EventFormState['status'] }))}>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="event-venue" className="mb-1 block text-sm text-text-secondary">Venue</label>
            <input id="event-venue" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.venue} onChange={(event) => setForm((prev) => ({ ...prev, venue: event.target.value }))} />
          </div>
          <div>
            <label htmlFor="event-city" className="mb-1 block text-sm text-text-secondary">City</label>
            <input id="event-city" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.city} onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))} />
          </div>
        </div>

        <div>
          <label htmlFor="event-registration-url" className="mb-1 block text-sm text-text-secondary">Registration / notes URL</label>
          <input id="event-registration-url" type="url" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.registrationUrl} onChange={(event) => setForm((prev) => ({ ...prev, registrationUrl: event.target.value }))} />
        </div>

        <div>
          <label htmlFor="event-image-url" className="mb-1 block text-sm text-text-secondary">Event image</label>
          <input id="event-image-url" type="text" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.imageUrl} onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))} placeholder="Upload an image or enter its URL" />
          <AdminImageFieldUploader key={imageUploaderKey} folder="events" onUploaded={(path) => setForm((prev) => ({ ...prev, imageUrl: path }))} />
        </div>

        {error && <p role="alert" className="border-l-4 border-sun bg-cream px-3 py-2 text-sm font-semibold text-text-primary">{error}</p>}
        {message && <p role="status" className="border-l-4 border-sky bg-cream px-3 py-2 text-sm font-semibold text-text-primary">{message}</p>}

        <div className="flex gap-3">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update Event' : 'Create Event'}
          </button>
          <button
            type="button"
            className="btn-secondary text-sm"
            onClick={() => {
              setForm(initialForm);
              setImageUploaderKey((key) => key + 1);
              setError(null);
              setMessage(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Existing Events</h3>
        {loading ? (
          <p className="text-sm text-text-secondary">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-text-secondary">No events yet.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex flex-col gap-3 rounded-xl border border-line p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-text-secondary">{event.date} · {event.status} · /{event.slug}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-secondary text-sm" onClick={() => onEdit(event)}>Edit</button>
                <button type="button" className="btn-secondary text-sm" onClick={() => void onDelete(event.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
