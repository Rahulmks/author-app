import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Container from '@/components/layout/Container';
import { getBook } from '@/lib/books/get-books';

export default async function BookDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const book = await getBook(params.slug);

  if (!book) {
    notFound();
  }

  return (
    <Container className="py-12 md:py-20">
      <div className="grid gap-8 md:grid-cols-[300px_1fr] items-start">
        <div className="manuscript-card rounded-[2rem] p-4">
          <div className="relative aspect-[2/3] overflow-hidden rounded-[1.5rem] border border-border-color bg-neutral-200">
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

        <div className="paper-panel rounded-[2rem] p-7 md:p-10">
          <p className="eyebrow mb-4">
            நூல்
          </p>
          <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
            {book.title}
          </h1>
          <p className="mb-6 text-lg leading-8 text-text-secondary">
            {book.description}
          </p>

          <div className="mb-8 space-y-2 text-text-secondary">
            {book.publishedYear && <p>வெளியீட்டு ஆண்டு: {book.publishedYear}</p>}
            {book.publisher && <p>பதிப்பகம்: {book.publisher}</p>}
            {book.language && <p>மொழி: {book.language}</p>}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="https://amazon.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-border-color px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
              வாங்க
            </a>
            <a href="https://goodreads.com" target="_blank" rel="noopener noreferrer" className="ink-link inline-flex items-center text-sm font-medium text-accent">
              Goodreads
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
