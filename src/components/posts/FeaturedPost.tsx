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
    <article className="group border-y border-border-color py-6 md:py-8">
      <Link 
        href={`/posts/${post.slug}`}
        className="block md:grid md:grid-cols-2 gap-6 md:gap-8 items-center"
      >
        {post.coverImage && (
          <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-border-color md:mb-0">
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
              {categoryKey ? tNav(categoryKey) : post.category}
            </p>
          )}
          
          <h2 className="mb-3 text-2xl font-medium leading-tight transition-colors group-hover:text-accent md:text-3xl">
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
          
          <span className="ink-link inline-flex font-medium text-accent">{t('openArticle')}</span>
        </div>
      </Link>
    </article>
  );
}
