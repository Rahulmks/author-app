import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Post } from '@/types/post';
import { formatDate } from '@/lib/navigation';
import { getCategoryLabelKey } from '@/lib/posts/categories';

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const categoryKey = getCategoryLabelKey(post.category);
  const locale = useLocale();
  return (
    <article className="card group">
      <Link 
        href={`/posts/${post.slug}`}
        className="card-link block md:grid md:grid-cols-2 items-center"
      >
        {post.coverImage && (
          <div className="media-frame relative aspect-[16/10]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-6 md:p-8">
          {post.category && (
            <p className="label mb-3">
              {categoryKey ? tNav(categoryKey) : post.category}
            </p>
          )}
          
          <h2 className="mb-3 text-2xl font-bold leading-tight group-hover:underline underline-offset-4 md:text-3xl">
            {post.title}
          </h2>
          
          <p className="mb-5 line-clamp-3 text-base leading-7 text-text-secondary">
            {post.excerpt}
          </p>

          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, locale, 'long')}
              </time>
            )}
            {post.readingTimeMinutes && (
              <>
                {post.publishedAt && <span>·</span>}
                <span>{t('readingTime', { minutes: post.readingTimeMinutes })}</span>
              </>
            )}
          </div>
          
          <span className="ink-link inline-flex">{t('openArticle')}</span>
        </div>
      </Link>
    </article>
  );
}
