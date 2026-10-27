import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Post, PostSummary } from '@/types/post';
import { formatDate } from '@/lib/navigation';
import { getCategoryLabelKey } from '@/lib/posts/categories';

interface PostCardProps {
  post: Post | PostSummary;
}

export default function PostCard({ post }: PostCardProps) {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const categoryKey = getCategoryLabelKey(post.category);
  const locale = useLocale();
  return (
    <article className="group border-t border-line py-4 md:py-5 first:border-t-0">
      <Link href={`/posts/${post.slug}`} className="flex items-start justify-between gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <div className="label mb-1.5 flex flex-wrap items-center gap-2">
            {post.category && <span>{categoryKey ? tNav(categoryKey) : post.category}</span>}
            {post.category && post.publishedAt && <span>·</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="font-normal normal-case tracking-normal">
                {formatDate(post.publishedAt, locale)}
              </time>
            )}
            {post.readingTimeMinutes && (
              <span className="font-normal normal-case tracking-normal">
                · {t('readingTime', { minutes: post.readingTimeMinutes })}
              </span>
            )}
          </div>
          
          <h3 className="mb-1.5 text-base font-semibold leading-snug group-hover:underline underline-offset-4 md:text-lg">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="mb-0 line-clamp-1 text-sm leading-relaxed text-text-secondary">
              {post.excerpt}
            </p>
          )}
        </div>

        {post.coverImage && (
          <div className="media-frame relative h-20 w-20 flex-shrink-0 md:h-24 md:w-24">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
