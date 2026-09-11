import type { Book } from '@/types/book';
import { mockBooks } from '@/data/books';

import type { BookRepository } from '@/lib/books/book-repository';

export class MockBookRepository implements BookRepository {
  async getBooks(): Promise<Book[]> {
    return mockBooks;
  }

  async getBookBySlug(slug: string): Promise<Book | null> {
    return mockBooks.find((book) => book.slug === slug) ?? null;
  }
}
