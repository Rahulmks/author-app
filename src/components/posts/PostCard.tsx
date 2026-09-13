import Link from 'next/link';
import Image from 'next/image';
import { Post, PostSummary } from '@/types/post';
import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

interface PostCardProps {
  post: Post | PostSummary;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group hover-lift">
      <Link href={`/posts/${post.slug}`} className="block h-full py-4 md:py-5">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
          {post.category && <span>{post.category}</span>}
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatTamilDate(post.publishedAt, 'short')}</time>}
        </div>

        <h3 className="mb-2 max-w-xl text-2xl font-semibold leading-tight transition-colors group-hover:text-accent md:text-[2.1rem]">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mb-4 max-w-xl text-base leading-8 text-text-secondary">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
          {post.readingTimeMinutes && <span>{formatTamilReadingTime(post.readingTimeMinutes)}</span>}
          <span className="text-accent">Read →</span>
        </div>
      </Link>
    </article>
  );
}
