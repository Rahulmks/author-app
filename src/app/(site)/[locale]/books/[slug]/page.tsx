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
          className="label inline-flex min-h-11 items-center transition-colors hover:underline underline-offset-4"
        >
          {t('back')}
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-[260px_1fr] items-start max-w-4xl mx-auto">
        <div className="w-full max-w-[260px] mx-auto">
          <div className="media-frame relative aspect-[2/3] shadow-card">
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

        <div className="paper-panel p-6 md:p-8">
          <p className="eyebrow mb-2">
            {t('label')}
          </p>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            {book.title}
          </h1>
          <p className="mb-6 text-base leading-relaxed text-text-secondary">
            {book.description}
          </p>

          <div className="mb-6 space-y-1.5 border-t border-line pt-4 text-sm text-text-secondary">
            {book.publishedYear && <p className="mb-0"><span className="font-semibold text-text-primary">{t('year')}</span> {book.publishedYear}</p>}
            {book.publisher && <p className="mb-0"><span className="font-semibold text-text-primary">{t('publisher')}</span> {book.publisher}</p>}
            {book.language && <p className="mb-0"><span className="font-semibold text-text-primary">{t('language')}</span> {book.language}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="https://amazon.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t('buy')}
            </a>
            <a href="https://goodreads.com" target="_blank" rel="noopener noreferrer" className="ink-link inline-flex min-h-11 items-center text-sm">
              Goodreads
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
