import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/post';
import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="group border-y border-border-color py-8 md:py-12">
      <Link 
        href={`/posts/${post.slug}`}
        className="block md:grid md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {post.coverImage && (
          <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-border-color md:mb-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div>
          {post.category && (
            <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-accent">
              {post.category}
            </p>
          )}
          
          <h2 className="mb-4 text-3xl font-medium leading-tight transition-colors group-hover:text-accent md:text-4xl">
            {post.title}
          </h2>
          
          <p className="mb-6 line-clamp-4 text-lg leading-8 text-text-secondary">
            {post.excerpt}
          </p>

          <blockquote className="pull-quote mb-6 text-base leading-8 text-text-secondary">
            மொழி மாறினாலும் உணர்வின் அமைதி மாறாது; ஒரு நல்ல உரை இரு உலகங்களையும் இணைக்கிறது.
          </blockquote>
          
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatTamilDate(post.publishedAt, 'long')}
              </time>
            )}
            {post.readingTimeMinutes && (
              <>
                {post.publishedAt && <span>·</span>}
                <span>{formatTamilReadingTime(post.readingTimeMinutes)}</span>
              </>
            )}
          </div>
          
          <span className="ink-link inline-flex font-medium text-accent">கட்டுரையைத் திறக்க</span>
        </div>
      </Link>
    </article>
  );
}
