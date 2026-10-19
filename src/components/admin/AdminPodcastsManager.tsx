'use client';

import { FormEvent, useEffect, useState } from 'react';

import AdminImageFieldUploader from '@/components/admin/AdminImageFieldUploader';

interface PodcastRecord {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  platform: 'spotify' | 'apple' | 'youtube' | 'other';
  episodeUrl: string;
  coverImage?: string;
  episodeNumber?: number;
  duration?: string;
  publishedAt?: string;
}

interface PodcastFormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  platform: 'spotify' | 'apple' | 'youtube' | 'other';
  episodeUrl: string;
  coverImage: string;
  episodeNumber: string;
  duration: string;
  publishedAt: string;
}

const initialForm: PodcastFormState = {
  title: '',
  slug: '',
  description: '',
  platform: 'spotify',
  episodeUrl: '',
  coverImage: '',
  episodeNumber: '',
  duration: '',
  publishedAt: '',
};

function toDateInput(value?: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 16);
}

export default function AdminPodcastsManager() {
  const [episodes, setEpisodes] = useState<PodcastRecord[]>([]);
  const [form, setForm] = useState<PodcastFormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/podcasts', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load podcast episodes.');
      }

      const payload = (await response.json()) as { podcasts?: PodcastRecord[] };
      setEpisodes(payload.podcasts ?? []);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load podcast episodes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/podcasts', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          episodeNumber: form.episodeNumber ? Number(form.episodeNumber) : undefined,
          publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
        }),
      });

      if (!response.ok) {
        const details = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(details?.error ?? 'Unable to save podcast episode.');
      }

      await fetchEpisodes();
      setForm(initialForm);
      setMessage(form.id ? 'Podcast updated.' : 'Podcast created.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save podcast episode.');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (episode: PodcastRecord) => {
    setForm({
      id: episode.id,
      title: episode.title,
      slug: episode.slug ?? '',
      description: episode.description ?? '',
      platform: episode.platform,
      episodeUrl: episode.episodeUrl,
      coverImage: episode.coverImage ?? '',
      episodeNumber: episode.episodeNumber ? String(episode.episodeNumber) : '',
      duration: episode.duration ?? '',
      publishedAt: toDateInput(episode.publishedAt),
    });
    setMessage(null);
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this podcast episode?')) {
      return;
    }

    const response = await fetch('/api/podcasts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const details = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(details?.error ?? 'Unable to delete podcast episode.');
      return;
    }

    if (form.id === id) {
      setForm(initialForm);
    }

    await fetchEpisodes();
    setMessage('Podcast deleted.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Podcasts</h2>
        <p className="text-sm text-text-secondary">Manage podcast entries shown in the public podcast section.</p>
      </div>

      <form className="grid gap-4 rounded-xl border border-line p-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Title</label>
            <input className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.title} required onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Slug</label>
            <input className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} placeholder="auto-generated if empty" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-text-secondary">Description</label>
          <textarea className="w-full rounded-lg border border-line bg-cream px-3 py-2" rows={3} value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Platform</label>
            <select className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.platform} onChange={(event) => setForm((prev) => ({ ...prev, platform: event.target.value as PodcastFormState['platform'] }))}>
              <option value="spotify">spotify</option>
              <option value="apple">apple</option>
              <option value="youtube">youtube</option>
              <option value="other">other</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Episode Number</label>
            <input type="number" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.episodeNumber} onChange={(event) => setForm((prev) => ({ ...prev, episodeNumber: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Duration</label>
            <input className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.duration} onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))} placeholder="31:02" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Episode URL</label>
            <input type="url" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.episodeUrl} required onChange={(event) => setForm((prev) => ({ ...prev, episodeUrl: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Cover Image Path</label>
            <input className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.coverImage} onChange={(event) => setForm((prev) => ({ ...prev, coverImage: event.target.value }))} placeholder="media/podcasts/cover.jpg" />
            <AdminImageFieldUploader folder="podcasts" onUploaded={(path) => setForm((prev) => ({ ...prev, coverImage: path }))} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-text-secondary">Published At</label>
          <input type="datetime-local" className="w-full rounded-lg border border-line bg-cream px-3 py-2" value={form.publishedAt} onChange={(event) => setForm((prev) => ({ ...prev, publishedAt: event.target.value }))} />
        </div>

        {error && <p className="border-l-4 border-sun bg-cream px-3 py-2 text-sm font-semibold text-text-primary">{error}</p>}
        {message && <p className="border-l-4 border-sky bg-cream px-3 py-2 text-sm font-semibold text-text-primary">{message}</p>}

        <div className="flex gap-3">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update Podcast' : 'Create Podcast'}
          </button>
          <button type="button" className="btn-secondary text-sm" onClick={() => setForm(initialForm)}>
            Reset
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Existing Podcast Episodes</h3>
        {loading ? (
          <p className="text-sm text-text-secondary">Loading podcasts...</p>
        ) : (
          episodes.map((episode) => (
            <div key={episode.id} className="flex flex-col gap-3 rounded-xl border border-line p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{episode.title}</p>
                <p className="text-sm text-text-secondary">{episode.platform} • /{episode.slug ?? 'no-slug'}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-secondary text-sm" onClick={() => onEdit(episode)}>Edit</button>
                <button type="button" className="btn-secondary text-sm" onClick={() => onDelete(episode.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
