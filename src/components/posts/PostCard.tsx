import Link from 'next/link';
import Image from 'next/image';
import { Post, PostSummary } from '@/types/post';
import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

interface PostCardProps {
  post: Post | PostSummary;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group hover-lift manuscript-card overflow-hidden rounded-[1.75rem]">
      <Link href={`/posts/${post.slug}`} className="block h-full p-4 md:p-5">
        {post.coverImage && (
          <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-border-color">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        )}
        
        {post.category && (
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-accent">
            {post.category}
          </p>
        )}
        
        <h3 className="mb-3 text-2xl font-semibold leading-snug transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        
        <p className="mb-6 line-clamp-3 text-sm leading-7 text-text-secondary md:text-base">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 border-t border-border-color pt-4 text-sm text-text-secondary">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatTamilDate(post.publishedAt)}
            </time>
          )}
          {post.readingTimeMinutes && (
            <>
              {post.publishedAt && <span>·</span>}
              <span>{formatTamilReadingTime(post.readingTimeMinutes)}</span>
            </>
          )}
        </div>
      </Link>
    </article>
  );
}
