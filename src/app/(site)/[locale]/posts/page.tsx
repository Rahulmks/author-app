import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import EmptyState from '@/components/ui/EmptyState';
import { getPosts } from '@/lib/posts/get-posts';
import { getCategoryLabelKey, isPostInCategory, postCategories as configuredPostCategories } from '@/lib/posts/categories';

// Stored value of the "all" filter; kept in Tamil so existing ?category= URLs keep working.
const ALL_CATEGORY = 'அனைத்தும்';

const postCategories = [
  ALL_CATEGORY,
  ...configuredPostCategories,
];

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const t = await getTranslations('posts');
  const tNav = await getTranslations('nav');
  const { category: activeCategory } = (await searchParams) || {};
  const allPosts = await getPosts();

  const posts = activeCategory && activeCategory !== ALL_CATEGORY
    ? allPosts.filter((post) => isPostInCategory(post.category, activeCategory))
    : allPosts;

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mb-8">
        <p className="eyebrow mb-2">
          {t('eyebrow')}
        </p>
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">
          {t('heading')}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          {t('body')}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {postCategories.map((category) => {
            const isActive = (!activeCategory && category === ALL_CATEGORY) || activeCategory === category;
            const href = category === ALL_CATEGORY ? '/posts' : `/posts?category=${encodeURIComponent(category)}`;
            const labelKey = getCategoryLabelKey(category);
            return (
              <Link
                key={category}
                href={href}
                className={`label inline-flex min-h-11 items-center border-b-2 text-text-primary transition-colors ${
                  isActive
                    ? 'border-pink font-bold'
                    : 'border-transparent hover:border-line'
                }`}
              >
                {category === ALL_CATEGORY ? t('all') : labelKey ? tNav(labelKey) : category}
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        {posts.length > 0 ? (
          <div className="paper-panel max-w-3xl divide-y divide-line px-4 md:px-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            message={t('empty')}
            action={
              <Link href="/posts" className="ink-link inline-flex min-h-11 items-center text-sm">
                {t('viewAll')}
              </Link>
            }
          />
        )}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center gap-5 text-sm text-text-secondary">
          <Link href="#" className="inline-flex min-h-11 items-center hover:underline underline-offset-4">{t('previousPage')}</Link>
          <span>1</span>
          <Link href="#" className="inline-flex min-h-11 items-center hover:underline underline-offset-4">{t('nextPage')}</Link>
        </div>
      </div>
    </Container>
  );
}
