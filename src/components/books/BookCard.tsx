import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group flex flex-col h-full rounded-lg border border-border-color/60 bg-paper/30 p-3 transition-colors hover:border-accent/60">
      <Link href={`/books/${book.slug}`} className="flex flex-col h-full">
        {book.coverImage && (
          <div className="relative mb-3 aspect-[2/3] w-full overflow-hidden rounded bg-border-color">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Book Cover Hover Quote Reveal Overlay */}
            <div className="absolute inset-0 bg-background/90 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center text-center backdrop-blur-sm border border-accent/30">
              <blockquote className="font-serif text-xs md:text-sm italic leading-relaxed text-accent">
                &ldquo;{book.description ? (book.description.length > 90 ? `${book.description.slice(0, 90)}...` : book.description) : book.title}&rdquo;
              </blockquote>
            </div>
          </div>
        )}
        
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="mb-1 text-base md:text-lg font-medium leading-snug transition-colors group-hover:text-accent">
              {book.title}
            </h3>
            
            <p className="mb-2 text-xs text-accent font-medium">
              {book.publishedYear}
              {book.language && ` · ${book.language}`}
            </p>
            
            {book.description && (
              <p className="line-clamp-2 text-xs md:text-sm leading-relaxed text-text-secondary">
                {book.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
