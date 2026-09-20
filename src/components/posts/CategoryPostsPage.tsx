import Link from 'next/link';

import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import EmptyState from '@/components/ui/EmptyState';
import { getPosts } from '@/lib/posts/get-posts';
import { isPostInCategory } from '@/lib/posts/categories';

interface CategoryPostsPageProps {
  category?: string;
  eyebrow: string;
  title: string;
}

export default async function CategoryPostsPage({ category, eyebrow, title }: CategoryPostsPageProps) {
  const allPosts = await getPosts();
  const posts = category ? allPosts.filter((post) => isPostInCategory(post.category, category)) : allPosts;

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">{eyebrow}</p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">{title}</h1>
      </div>
      <div className="border-t border-border-color pt-4">
        {posts.length > 0 ? (
          <div className="max-w-3xl divide-y divide-border-color">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        ) : (
          <EmptyState
            message="இந்தப் பிரிவில் தற்சமயம் பதிவுகள் எதுவும் இல்லை."
            action={category ? <Link href="/posts" className="ink-link text-sm font-medium text-accent">அனைத்துப் பதிவுகளையும் காண்க</Link> : undefined}
          />
        )}
      </div>
    </Container>
  );
}