import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { Book } from '@/types/book';

interface BooksStripProps {
  books: Book[];
}

/** Compact one-row (scrollable) strip of book covers linking to /books. */
export default function BooksStrip({ books }: BooksStripProps) {
  if (!books.length) {
    return null;
  }

  return (
    <section className="py-10 md:py-14">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold md:text-3xl">நூல்கள்</h2>
          <Link href="/books" className="ink-link whitespace-nowrap text-sm font-medium text-accent">
            எல்லாவற்றையும் காண்க
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.slug}`} className="group w-32 flex-shrink-0 sm:w-36 md:w-40">
              {book.coverImage ? (
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-border-color/60 bg-border-color">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-lg border border-border-color/60 bg-paper/40 p-3 text-center">
                  <span className="text-sm font-medium leading-snug text-text-primary">{book.title}</span>
                </div>
              )}
              <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug text-text-secondary group-hover:text-accent md:text-sm">
                {book.title}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
