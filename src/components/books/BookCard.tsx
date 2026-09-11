import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group hover-lift manuscript-card rounded-[1.75rem] p-4 md:p-5">
      <Link href={`/books/${book.slug}`} className="block h-full">
        {book.coverImage && (
          <div className="relative mb-5 aspect-[2/3] overflow-hidden rounded-[1.4rem] bg-border-color shadow-sm">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
        
        <h3 className="mb-2 text-xl font-semibold leading-snug transition-colors group-hover:text-accent md:text-2xl">
          {book.title}
        </h3>
        
        <p className="mb-3 text-sm text-text-secondary">
          {book.publishedYear}
          {book.language && ` · ${book.language}`}
        </p>
        
        <p className="line-clamp-3 text-sm leading-7 text-text-secondary">
          {book.description}
        </p>
      </Link>
    </article>
  );
}
