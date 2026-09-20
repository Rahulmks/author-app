import Link from 'next/link';
import Image from 'next/image';
import { PostSummary } from '@/types/post';
import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

interface PostGridCardProps {
  post: PostSummary;
}

/** Home page card variant of a post summary, used in the recent-posts grid. */
export default function PostGridCard({ post }: PostGridCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-color/60 bg-paper/30 transition-colors hover:border-accent/60">
      <Link href={`/posts/${post.slug}`} className="flex h-full flex-col">
        {post.coverImage && (
          <div className="relative aspect-[16/10] overflow-hidden bg-border-color">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
            {post.category && <span>{post.category}</span>}
            {post.category && post.publishedAt && <span>·</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="font-normal tracking-normal text-text-secondary">
                {formatTamilDate(post.publishedAt)}
              </time>
            )}
          </div>
          <h3 className="mb-2 text-base font-medium leading-snug transition-colors group-hover:text-accent md:text-lg">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
          )}
          {post.readingTimeMinutes && (
            <p className="mt-auto pt-3 text-xs text-text-secondary">
              {formatTamilReadingTime(post.readingTimeMinutes)}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
