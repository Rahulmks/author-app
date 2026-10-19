import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import Container from '@/components/layout/Container';
import { getBook } from '@/lib/books/get-books';

export default async function BookDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const book = await getBook(params.slug);
  const t = await getTranslations('books');

  if (!book) {
    notFound();
  }

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-4xl mx-auto mb-6">
        <Link
          href="/books"
          className="inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-text-secondary hover:text-accent transition-colors"
        >
          {t('back')}
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-[260px_1fr] items-start max-w-4xl mx-auto">
        <div className="w-full max-w-[260px] mx-auto">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-border-color/60 bg-paper shadow-md">
            {book.coverImage && (
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="paper-panel rounded-2xl p-6 md:p-8">
          <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
            {t('label')}
          </p>
          <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
            {book.title}
          </h1>
          <p className="mb-6 text-base leading-relaxed text-text-secondary">
            {book.description}
          </p>

          <div className="mb-6 space-y-1.5 text-xs md:text-sm text-text-secondary border-t border-border-color/40 pt-4">
            {book.publishedYear && <p><span className="font-medium text-text-primary">{t('year')}</span> {book.publishedYear}</p>}
            {book.publisher && <p><span className="font-medium text-text-primary">{t('publisher')}</span> {book.publisher}</p>}
            {book.language && <p><span className="font-medium text-text-primary">{t('language')}</span> {book.language}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="https://amazon.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md border border-border-color px-4 py-2 text-xs font-medium transition-colors hover:border-accent hover:text-accent">
              {t('buy')}
            </a>
            <a href="https://goodreads.com" target="_blank" rel="noopener noreferrer" className="ink-link inline-flex items-center text-xs font-medium text-accent">
              Goodreads
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
