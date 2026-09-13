import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group hover-lift">
      <Link href={`/books/${book.slug}`} className="block h-full">
        {book.coverImage && (
          <div className="relative mb-5 aspect-[2/3] overflow-hidden border border-border-color bg-paper">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="mb-2 flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-text-secondary">
          <span>{book.publishedYear}</span>
          {book.language && <span>{book.language}</span>}
        </div>

        <h3 className="mb-2 text-2xl font-semibold leading-tight transition-colors group-hover:text-accent">
          {book.title}
        </h3>

        <p className="mb-4 text-base leading-7 text-text-secondary">
          {book.description}
        </p>

        <span className="ink-link text-sm font-medium uppercase tracking-[0.18em] text-accent">
          learn more
        </span>
      </Link>
    </article>
  );
}
