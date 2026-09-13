import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group border-t border-border-color pt-6">
      <Link href={`/books/${book.slug}`} className="block h-full">
        {book.coverImage && (
          <div className="relative mb-6 aspect-[2/3] overflow-hidden bg-border-color">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <h3 className="mb-2 text-xl font-medium leading-snug transition-colors group-hover:text-accent md:text-2xl">
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
