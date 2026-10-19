import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { PostSummary } from '@/types/post';
import { formatDate } from '@/lib/navigation';
import { getCategoryLabelKey } from '@/lib/posts/categories';

interface PostGridCardProps {
  post: PostSummary;
}

/** Home page card variant of a post summary, used in the recent-posts grid. */
export default function PostGridCard({ post }: PostGridCardProps) {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const categoryKey = getCategoryLabelKey(post.category);
  const locale = useLocale();
  return (
    <article className="card card-tilt group flex h-full flex-col">
      <Link href={`/posts/${post.slug}`} className="card-link flex h-full flex-col">
        {post.coverImage && (
          <div className="media-frame relative aspect-[16/10]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="card-body card-body-lg">
          <h3 className="card-title">
            {post.title}
          </h3>
          <div className="label mb-2 flex flex-wrap items-center gap-2">
            {post.category && <span>{categoryKey ? tNav(categoryKey) : post.category}</span>}
            {post.category && post.publishedAt && <span>·</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="font-normal normal-case tracking-normal">
                {formatDate(post.publishedAt, locale)}
              </time>
            )}
          </div>
          {post.excerpt && (
            <p className="mb-0 line-clamp-2 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
          )}
          {post.readingTimeMinutes && (
            <p className="mb-0 mt-auto pt-3 text-xs text-text-secondary">
              {t('readingTime', { minutes: post.readingTimeMinutes })}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
