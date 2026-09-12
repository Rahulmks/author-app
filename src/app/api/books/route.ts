import { NextResponse } from 'next/server';
import { getJsonObject } from '@/lib/aws/s3-read';
import { isS3Configured } from '@/lib/aws/s3-client';
import { deleteObject, putJsonObject } from '@/lib/aws/s3-write';
import { requireAdminSession } from '@/lib/auth/auth';
import { revalidateBooks } from '@/lib/cache/revalidate';
import { mockBooks } from '@/data/books';
import { bookRepository } from '@/lib/repositories';
import type { Book } from '@/types/book';

const BOOKS_INDEX_KEY = 'books/index.json';

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

function normalizeBook(input: Record<string, unknown>, existing?: Book): Book {
  const now = new Date().toISOString();
  const title = toOptionalString(input.title);
  const description = toOptionalString(input.description);

  if (!title) {
    throw new Error('Title is required.');
  }

  if (!description) {
    throw new Error('Description is required.');
  }

  const slug = toSlug(toOptionalString(input.slug) || title);
  const publicationYear =
    typeof input.publicationYear === 'number'
      ? input.publicationYear
      : typeof input.publicationYear === 'string' && input.publicationYear.trim()
        ? Number(input.publicationYear)
        : undefined;

  return {
    id: existing?.id ?? `book-${Date.now()}`,
    title,
    slug,
    description,
    coverImage: toOptionalString(input.coverImage),
    publicationYear: Number.isFinite(publicationYear) ? publicationYear : undefined,
    publishedYear: Number.isFinite(publicationYear) ? publicationYear : undefined,
    publisher: toOptionalString(input.publisher),
    language: toOptionalString(input.language),
    purchaseUrl: toOptionalString(input.purchaseUrl),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    source: existing?.source,
  };
}

async function loadBooksForWrite() {
  if (isS3Configured()) {
    return (await getJsonObject<Book[]>(BOOKS_INDEX_KEY)) ?? [];
  }

  return mockBooks;
}

async function persistBooks(nextBooks: Book[]) {
  if (isS3Configured()) {
    await putJsonObject(BOOKS_INDEX_KEY, nextBooks);

    await Promise.all(
      nextBooks.map((book) => putJsonObject(`books/items/${book.slug}.json`, book)),
    );
    return;
  }

  mockBooks.splice(0, mockBooks.length, ...nextBooks);
}

export async function GET(request: Request) {
  await requireAdminSession();

  const books = await bookRepository.getBooks();
  return NextResponse.json({ books });
}

export async function POST(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const books = await loadBooksForWrite();
    const book = normalizeBook(body);
    books.push(book);
    await persistBooks(books);
    revalidateBooks();
    return NextResponse.json({ book }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create book.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const id = typeof body?.id === 'string' ? body.id : undefined;

  if (!body || !id) {
    return NextResponse.json({ error: 'Book id is required.' }, { status: 400 });
  }

  const books = await loadBooksForWrite();
  const currentIndex = books.findIndex((book) => book.id === id);

  if (currentIndex < 0) {
    return NextResponse.json({ error: 'Book not found.' }, { status: 404 });
  }

  try {
    const existing = books[currentIndex];
    const updated = normalizeBook(body, existing);
    books[currentIndex] = updated;
    await persistBooks(books);

    if (isS3Configured() && existing.slug !== updated.slug) {
      await deleteObject(`books/items/${existing.slug}.json`).catch(() => null);
    }

    revalidateBooks();
    return NextResponse.json({ book: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update book.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id) {
    return NextResponse.json({ error: 'Book id is required.' }, { status: 400 });
  }

  const books = await loadBooksForWrite();
  const toDelete = books.find((book) => book.id === id);

  if (!toDelete) {
    return NextResponse.json({ error: 'Book not found.' }, { status: 404 });
  }

  const nextBooks = books.filter((book) => book.id !== id);
  await persistBooks(nextBooks);

  if (isS3Configured()) {
    await deleteObject(`books/items/${toDelete.slug}.json`).catch(() => null);
  }

  revalidateBooks();
  return NextResponse.json({ success: true });
}
