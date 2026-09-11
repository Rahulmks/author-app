import type { Book } from '@/types/book';

export interface BookRepository {
  getBooks(): Promise<Book[]>;
  getBookBySlug(slug: string): Promise<Book | null>;
}
