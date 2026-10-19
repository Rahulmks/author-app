import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="card card-tilt group flex h-full flex-col">
      <Link href={`/books/${book.slug}`} className="card-link flex h-full flex-col">
        {book.coverImage && (
          <div className="media-frame relative aspect-[2/3] w-full">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Book Cover Hover Quote Reveal Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-ink p-4 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <blockquote className="font-display text-sm italic leading-relaxed text-white">
                &ldquo;{book.description ? (book.description.length > 90 ? `${book.description.slice(0, 90)}...` : book.description) : book.title}&rdquo;
              </blockquote>
            </div>
          </div>
        )}
        
        <div className="card-body">
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="card-title">
                {book.title}
              </h3>
              
              <p className="mb-2 text-xs font-semibold text-text-secondary">
                {book.publishedYear}
                {book.language && ` · ${book.language}`}
              </p>
              
              {book.description && (
                <p className="mb-0 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                  {book.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
