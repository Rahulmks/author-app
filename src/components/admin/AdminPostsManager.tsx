'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

import AdminImageFieldUploader from '@/components/admin/AdminImageFieldUploader';
import { postCategories } from '@/lib/posts/categories';

interface PostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  contentFormat?: 'html';
  coverImage?: string;
  author?: string;
  status?: 'draft' | 'published';
  category?: string;
  tags?: string[];
  readingTimeMinutes?: number;
  publishedAt?: string;
  featured?: boolean;
}

interface PostFormState {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  status: 'draft' | 'published';
  category: string;
  tags: string;
  readingTimeMinutes: string;
  publishedAt: string;
  featured: boolean;
}

const PREDEFINED_POST_CATEGORIES: string[] = [...postCategories];

const initialForm: PostFormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  author: 'எழுத்தாளர்',
  status: 'draft',
  category: '',
  tags: '',
  readingTimeMinutes: '',
  publishedAt: '',
  featured: false,
};

function toDateInput(value?: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 16);
}

export default function AdminPostsManager() {
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormState>(initialForm);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const editingId = useMemo(() => form.id, [form.id]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/posts?status=all', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load posts.');
      }

      const payload = (await response.json()) as { posts?: PostRecord[] };
      setPosts(payload.posts ?? []);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setIsCustomCategory(false);
  };

  const populateFormForEdit = (post: PostRecord) => {
    const categoryVal = post.category ?? '';
    const isKnown = PREDEFINED_POST_CATEGORIES.includes(categoryVal);

    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content ?? '',
      coverImage: post.coverImage ?? '',
      author: post.author ?? 'எழுத்தாளர்',
      status: post.status ?? 'draft',
      category: categoryVal,
      tags: (post.tags ?? []).join(', '),
      readingTimeMinutes: post.readingTimeMinutes ? String(post.readingTimeMinutes) : '',
      publishedAt: toDateInput(post.publishedAt),
      featured: Boolean(post.featured),
    });

    setIsCustomCategory(!isKnown && categoryVal !== '');
    setSuccessMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    const payload = {
      id: form.id,
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      author: form.author,
      status: form.status,
      category: form.category,
      tags: form.tags,
      readingTimeMinutes: form.readingTimeMinutes,
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
      featured: form.featured,
    };

    try {
      const response = await fetch('/api/posts', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const details = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(details?.error ?? 'Unable to save post.');
      }

      await fetchPosts();
      resetForm();
      setSuccessMessage(editingId ? 'Post updated.' : 'Post created.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm('Delete this post?');
    if (!shouldDelete) {
      return;
    }

    setError(null);
    setSuccessMessage(null);

    const response = await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const details = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(details?.error ?? 'Unable to delete post.');
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    await fetchPosts();
    setSuccessMessage('Post deleted.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Posts</h2>
        <p className="text-sm text-text-secondary">Create drafts, publish articles, and edit existing content.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-border-color p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Title</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.title} required onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Slug</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} placeholder="auto-generated if empty" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-secondary">Excerpt</label>
          <textarea className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" rows={3} value={form.excerpt} required onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-secondary">Content (HTML)</label>
          <textarea className="w-full rounded-xl border border-border-color bg-paper px-3 py-2 font-mono text-sm" rows={10} value={form.content} required onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Cover Image Path</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.coverImage} onChange={(event) => setForm((prev) => ({ ...prev, coverImage: event.target.value }))} placeholder="media/posts/example.jpg" />
            <AdminImageFieldUploader folder="posts" onUploaded={(path) => setForm((prev) => ({ ...prev, coverImage: path }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Author</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.author} required onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Status</label>
            <select className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as 'draft' | 'published' }))}>
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Category (பிரிவு)</label>
            <select
              className="w-full rounded-xl border border-border-color bg-paper px-3 py-2"
              value={isCustomCategory ? '__custom__' : form.category}
              onChange={(event) => {
                const val = event.target.value;
                if (val === '__custom__') {
                  setIsCustomCategory(true);
                  setForm((prev) => ({ ...prev, category: '' }));
                } else {
                  setIsCustomCategory(false);
                  setForm((prev) => ({ ...prev, category: val }));
                }
              }}
            >
              <option value="">தேர்ந்தெடுக்கவும் (Select Category)...</option>
              <optgroup label="தமிழ் பிரிவுகள்">
                {postCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </optgroup>
              <option value="__custom__">-- பிற / Custom Category --</option>
            </select>
            {isCustomCategory && (
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-border-color bg-paper px-3 py-2 text-sm"
                placeholder="விருப்பப் பிரிவு / Type custom category..."
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              />
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Reading Time (minutes)</label>
            <input type="number" min={1} className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.readingTimeMinutes} onChange={(event) => setForm((prev) => ({ ...prev, readingTimeMinutes: event.target.value }))} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Tags (comma separated)</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.tags} onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-secondary">Published At</label>
            <input type="datetime-local" className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.publishedAt} onChange={(event) => setForm((prev) => ({ ...prev, publishedAt: event.target.value }))} />
          </div>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" checked={form.featured} onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))} />
          சிறப்புப் பதிவு
        </label>

        {error && <p className="text-sm text-red-700">{error}</p>}
        {successMessage && <p className="text-sm text-green-800">{successMessage}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
          </button>
          <button type="button" className="rounded-xl border border-border-color px-4 py-2 text-sm" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Existing Posts</h3>
        {loading ? (
          <p className="text-sm text-text-secondary">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-text-secondary">No posts found.</p>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <div key={post.id} className="flex flex-col gap-3 rounded-2xl border border-border-color p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-text-secondary">/{post.slug} • {post.status ?? 'draft'}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="rounded-xl border border-border-color px-3 py-2 text-sm" onClick={() => populateFormForEdit(post)}>
                    Edit
                  </button>
                  <button type="button" className="rounded-xl border border-red-400 px-3 py-2 text-sm text-red-700" onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
