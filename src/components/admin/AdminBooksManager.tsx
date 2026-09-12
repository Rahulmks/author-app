'use client';

import { FormEvent, useEffect, useState } from 'react';

import AdminImageFieldUploader from '@/components/admin/AdminImageFieldUploader';

interface BookRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  publicationYear?: number;
  publisher?: string;
  language?: string;
  purchaseUrl?: string;
}

interface BookFormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  publicationYear: string;
  publisher: string;
  language: string;
  purchaseUrl: string;
}

const initialForm: BookFormState = {
  title: '',
  slug: '',
  description: '',
  coverImage: '',
  publicationYear: '',
  publisher: '',
  language: '',
  purchaseUrl: '',
};

export default function AdminBooksManager() {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [form, setForm] = useState<BookFormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/books', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load books.');
      }

      const payload = (await response.json()) as { books?: BookRecord[] };
      setBooks(payload.books ?? []);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const payload = {
      ...form,
      publicationYear: form.publicationYear ? Number(form.publicationYear) : undefined,
    };

    try {
      const response = await fetch('/api/books', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const details = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(details?.error ?? 'Unable to save book.');
      }

      await fetchBooks();
      setForm(initialForm);
      setMessage(form.id ? 'Book updated.' : 'Book created.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save book.');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (book: BookRecord) => {
    setForm({
      id: book.id,
      title: book.title,
      slug: book.slug,
      description: book.description,
      coverImage: book.coverImage ?? '',
      publicationYear: book.publicationYear ? String(book.publicationYear) : '',
      publisher: book.publisher ?? '',
      language: book.language ?? '',
      purchaseUrl: book.purchaseUrl ?? '',
    });
    setMessage(null);
  };

  const onDelete = async (id: string) => {
    const shouldDelete = window.confirm('Delete this book?');
    if (!shouldDelete) {
      return;
    }

    const response = await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const details = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(details?.error ?? 'Unable to delete book.');
      return;
    }

    if (form.id === id) {
      setForm(initialForm);
    }

    await fetchBooks();
    setMessage('Book deleted.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Books</h2>
        <p className="text-sm text-text-secondary">Add and update books shown on the public books page.</p>
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
          <textarea className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" rows={4} value={form.description} required onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Cover Image Path</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.coverImage} onChange={(event) => setForm((prev) => ({ ...prev, coverImage: event.target.value }))} placeholder="media/books/book.jpg" />
            <AdminImageFieldUploader folder="books" onUploaded={(path) => setForm((prev) => ({ ...prev, coverImage: path }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Publication Year</label>
            <input type="number" className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.publicationYear} onChange={(event) => setForm((prev) => ({ ...prev, publicationYear: event.target.value }))} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Publisher</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.publisher} onChange={(event) => setForm((prev) => ({ ...prev, publisher: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Language</label>
            <input className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.language} onChange={(event) => setForm((prev) => ({ ...prev, language: event.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Purchase URL</label>
            <input type="url" className="w-full rounded-xl border border-border-color bg-paper px-3 py-2" value={form.purchaseUrl} onChange={(event) => setForm((prev) => ({ ...prev, purchaseUrl: event.target.value }))} />
          </div>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}
        {message && <p className="text-sm text-green-800">{message}</p>}

        <div className="flex gap-3">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update Book' : 'Create Book'}
          </button>
          <button type="button" className="rounded-xl border border-border-color px-4 py-2 text-sm" onClick={() => setForm(initialForm)}>
            Reset
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Existing Books</h3>
        {loading ? (
          <p className="text-sm text-text-secondary">Loading books...</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="flex flex-col gap-3 rounded-2xl border border-border-color p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-text-secondary">/{book.slug}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="rounded-xl border border-border-color px-3 py-2 text-sm" onClick={() => onEdit(book)}>Edit</button>
                <button type="button" className="rounded-xl border border-red-400 px-3 py-2 text-sm text-red-700" onClick={() => onDelete(book.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
