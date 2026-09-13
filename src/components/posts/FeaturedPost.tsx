import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/post';
import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="group border border-border-color bg-[rgba(46,32,56,0.38)] p-4 md:p-6">
      <Link href={`/posts/${post.slug}`} className="block md:grid md:grid-cols-[1.08fr_0.92fr] md:gap-10">
        {post.coverImage && (
          <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-border-color bg-paper md:mb-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex flex-col justify-center">
          {post.category && (
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {post.category}
            </p>
          )}

          <h2 className="mb-4 text-3xl font-semibold leading-[1.08] transition-colors group-hover:text-accent md:text-5xl">
            {post.title}
          </h2>

          <p className="mb-6 max-w-xl text-lg leading-8 text-text-secondary">
            {post.excerpt}
          </p>

          <div className="editorial-meta mb-6">
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatTamilDate(post.publishedAt, 'long')}</time>}
            {post.readingTimeMinutes && <span>{formatTamilReadingTime(post.readingTimeMinutes)}</span>}
          </div>

          <blockquote className="pull-quote mb-6 text-base leading-8 text-text-secondary">
            மொழி மாறினாலும் உணர்வின் அமைதி மாறாது; ஒரு நல்ல உரை இரு உலகங்களையும் இணைக்கிறது.
          </blockquote>

          <span className="inline-flex items-center text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Read essay
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
