import Link from 'next/link';
import Image from 'next/image';
import { Post, PostSummary } from '@/types/post';
import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

interface PostCardProps {
  post: Post | PostSummary;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border-t border-border-color py-5 first:border-t-0">
      <Link href={`/posts/${post.slug}`} className="block max-w-3xl">
        {post.coverImage && (
          <div className="relative mb-4 aspect-[16/7] overflow-hidden bg-border-color">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        {post.category && (
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-accent">
            {post.category}
          </p>
        )}
        
        <h3 className="mb-2 text-xl font-medium leading-snug transition-colors group-hover:text-accent md:text-2xl">
          {post.title}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-sm leading-7 text-text-secondary">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 border-t border-border-color pt-3 text-xs text-text-secondary">
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
