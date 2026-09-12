'use client';

import { FormEvent, useEffect, useState } from 'react';

interface VideoRecord {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  platform: 'youtube' | 'vimeo' | 'other';
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  publishedAt?: string;
}

interface VideoFormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  platform: 'youtube' | 'vimeo' | 'other';
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  publishedAt: string;
}

const initialForm: VideoFormState = {
  title: '',
  slug: '',
  description: '',
  platform: 'youtube',
  videoUrl: '',
  thumbnailUrl: '',
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

export default function AdminVideosManager() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [form, setForm] = useState<VideoFormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/videos', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load videos.');
      }

      const payload = (await response.json()) as { videos?: VideoRecord[] };
      setVideos(payload.videos ?? []);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/videos', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
        }),
      });

      if (!response.ok) {
        const details = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(details?.error ?? 'Unable to save video.');
      }

      await fetchVideos();
      setForm(initialForm);
      setMessage(form.id ? 'Video updated.' : 'Video created.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save video.');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (video: VideoRecord) => {
    setForm({
      id: video.id,
      title: video.title,
      slug: video.slug ?? '',
      description: video.description ?? '',
      platform: video.platform,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl ?? '',
      duration: video.duration ?? '',
      publishedAt: toDateInput(video.publishedAt),
    });
    setMessage(null);
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this video?')) {
      return;
    }

    const response = await fetch('/api/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const details = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(details?.error ?? 'Unable to delete video.');
      return;
    }

    if (form.id === id) {
      setForm(initialForm);
    }

    await fetchVideos();
    setMessage('Video deleted.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Videos</h2>
        <p className="text-sm text-text-secondary">Manage videos shown on the public videos page.</p>
      </div>

      <form className="grid gap-4 rounded-2xl border border-border-color p-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Title</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.title} required onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Slug</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} placeholder="auto-generated if empty" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-text-secondary">Description</label>
          <textarea className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" rows={3} value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Platform</label>
            <select className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.platform} onChange={(event) => setForm((prev) => ({ ...prev, platform: event.target.value as VideoFormState['platform'] }))}>
              <option value="youtube">youtube</option>
              <option value="vimeo">vimeo</option>
              <option value="other">other</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Duration</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.duration} onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))} placeholder="18:44" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Published At</label>
            <input type="datetime-local" className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.publishedAt} onChange={(event) => setForm((prev) => ({ ...prev, publishedAt: event.target.value }))} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Video URL</label>
            <input type="url" className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.videoUrl} required onChange={(event) => setForm((prev) => ({ ...prev, videoUrl: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Thumbnail Path</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.thumbnailUrl} onChange={(event) => setForm((prev) => ({ ...prev, thumbnailUrl: event.target.value }))} placeholder="media/videos/thumbnail.jpg" />
          </div>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}
        {message && <p className="text-sm text-green-800">{message}</p>}

        <div className="flex gap-3">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update Video' : 'Create Video'}
          </button>
          <button type="button" className="rounded-xl border border-border-color px-4 py-2 text-sm" onClick={() => setForm(initialForm)}>
            Reset
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Existing Videos</h3>
        {loading ? (
          <p className="text-sm text-text-secondary">Loading videos...</p>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="flex flex-col gap-3 rounded-2xl border border-border-color p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{video.title}</p>
                <p className="text-sm text-text-secondary">{video.platform} • /{video.slug ?? 'no-slug'}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="rounded-xl border border-border-color px-3 py-2 text-sm" onClick={() => onEdit(video)}>Edit</button>
                <button type="button" className="rounded-xl border border-red-400 px-3 py-2 text-sm text-red-700" onClick={() => onDelete(video.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
