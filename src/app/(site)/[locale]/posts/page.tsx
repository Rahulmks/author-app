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
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
          {t('eyebrow')}
        </p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
          {t('heading')}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          {t('body')}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {postCategories.map((category) => {
            const isActive = (!activeCategory && category === ALL_CATEGORY) || activeCategory === category;
            const href = category === ALL_CATEGORY ? '/posts' : `/posts?category=${encodeURIComponent(category)}`;
            const labelKey = getCategoryLabelKey(category);
            return (
              <Link
                key={category}
                href={href}
                className={`border-b pb-0.5 text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:border-accent hover:text-accent'
                }`}
              >
                {category === ALL_CATEGORY ? t('all') : labelKey ? tNav(labelKey) : category}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border-color pt-4">
        {posts.length > 0 ? (
          <div className="max-w-3xl divide-y divide-border-color">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            message={t('empty')}
            action={
              <Link href="/posts" className="ink-link text-sm font-medium text-accent">
                {t('viewAll')}
              </Link>
            }
          />
        )}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center gap-5 border-t border-border-color pt-4 text-sm text-text-secondary">
          <Link href="#" className="hover:text-accent">{t('previousPage')}</Link>
          <span>1</span>
          <Link href="#" className="hover:text-accent">{t('nextPage')}</Link>
        </div>
      </div>
    </Container>
  );
}
