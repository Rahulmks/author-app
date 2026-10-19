import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import EmptyState from '@/components/ui/EmptyState';
import { getPosts } from '@/lib/posts/get-posts';
import { isPostInCategory } from '@/lib/posts/categories';

interface CategoryPostsPageProps {
  category?: string;
  /** Key under `nav` in the messages files, used for the eyebrow and title. */
  labelKey: string;
}

export default async function CategoryPostsPage({ category, labelKey }: CategoryPostsPageProps) {
  const t = await getTranslations('posts');
  const tNav = await getTranslations('nav');
  const eyebrow = tNav(labelKey);
  const title = eyebrow;
  const allPosts = await getPosts();
  const posts = category ? allPosts.filter((post) => isPostInCategory(post.category, category)) : allPosts;

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">{title}</h1>
      </div>
      <div>
        {posts.length > 0 ? (
          <div className="paper-panel max-w-3xl divide-y divide-line px-4 md:px-6">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        ) : (
          <EmptyState
            message={t('empty')}
            action={category ? <Link href="/posts" className="ink-link inline-flex min-h-11 items-center text-sm">{t('viewAll')}</Link> : undefined}
          />
        )}
      </div>
    </Container>
  );
}