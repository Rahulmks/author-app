import Container from '@/components/layout/Container';
import { getTranslations } from 'next-intl/server';
import BookCard from '@/components/books/BookCard';
import EmptyState from '@/components/ui/EmptyState';
import { getBooks } from '@/lib/books/get-books';

export default async function BooksPage() {
  const books = await getBooks();
  const t = await getTranslations('books');

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mb-8">
        <p className="eyebrow mb-2">
          {t('eyebrow')}
        </p>
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">
          {t('heading')}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          {t('body')}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <EmptyState message={t('empty')} />
      )}
    </Container>
  );
}
