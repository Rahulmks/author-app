import { bookRepository } from '@/lib/repositories';

export async function getBooks() {
  return bookRepository.getBooks();
}

export async function getBook(slug: string) {
  return bookRepository.getBookBySlug(slug);
}
