import 'server-only';

import type { Book } from '@/types/book';
import { getJsonObject } from '@/lib/aws/s3-read';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

import type { BookRepository } from '@/lib/books/book-repository';

const BOOKS_INDEX_KEY = 'books/index.json';

export class S3BookRepository implements BookRepository {
  async getBooks(): Promise<Book[]> {
    const books = await getJsonObject<Book[]>(BOOKS_INDEX_KEY);
    return (books ?? []).map((book) => ({
      ...book,
      coverImage: resolveImagePath(book.coverImage),
    }));
  }

  async getBookBySlug(slug: string): Promise<Book | null> {
    const book = await getJsonObject<Book>(`books/items/${slug}.json`);
    if (!book) {
      return null;
    }

    return {
      ...book,
      coverImage: resolveImagePath(book.coverImage),
    };
  }
}
