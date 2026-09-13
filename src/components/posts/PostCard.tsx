import Link from 'next/link';
import Image from 'next/image';
import { Post, PostSummary } from '@/types/post';
import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

interface PostCardProps {
  post: Post | PostSummary;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border-t border-border-color py-4 md:py-5 first:border-t-0">
      <Link href={`/posts/${post.slug}`} className="flex items-start justify-between gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
            {post.category && <span>{post.category}</span>}
            {post.category && post.publishedAt && <span>·</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="text-text-secondary font-normal tracking-normal">
                {formatTamilDate(post.publishedAt)}
              </time>
            )}
            {post.readingTimeMinutes && (
              <span className="text-text-secondary font-normal tracking-normal">
                · {formatTamilReadingTime(post.readingTimeMinutes)}
              </span>
            )}
          </div>
          
          <h3 className="mb-1.5 text-base md:text-lg font-medium leading-snug transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="line-clamp-1 text-xs md:text-sm leading-relaxed text-text-secondary">
              {post.excerpt}
            </p>
          )}
        </div>

        {post.coverImage && (
          <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded border border-border-color/60 bg-paper">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
