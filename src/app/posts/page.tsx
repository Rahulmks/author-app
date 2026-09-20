import Link from 'next/link';

import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import EmptyState from '@/components/ui/EmptyState';
import { getPosts } from '@/lib/posts/get-posts';
import { isPostInCategory, postCategories as configuredPostCategories } from '@/lib/posts/categories';

const postCategories = [
  'அனைத்தும்',
  ...configuredPostCategories,
];

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { category: activeCategory } = (await searchParams) || {};
  const allPosts = await getPosts();

  const posts = activeCategory && activeCategory !== 'அனைத்தும்'
    ? allPosts.filter((post) => isPostInCategory(post.category, activeCategory))
    : allPosts;

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mb-8">
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
          எழுத்துகள்
        </p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
          கட்டுரைகள், கதைகள், மனநினைவுகள்
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          விளிம்புகளில் எழுதப்பட்ட குறிப்புகள், நிலமும் நினைவும் குறித்த கவனிப்புகள்,
          வாசித்துப் பின் நீண்ட நேரம் மனதில் தங்கும் சிறு கதைகள்.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {postCategories.map((category) => {
            const isActive = (!activeCategory && category === 'அனைத்தும்') || activeCategory === category;
            const href = category === 'அனைத்தும்' ? '/posts' : `/posts?category=${encodeURIComponent(category)}`;
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
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border-color pt-4">
        {posts.length > 0 ? (
          <div className="max-w-3xl divide-y divide-border-color">
            {posts.map((post) => (
              <PostCard key={post.id} post={post as any} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="இந்தப் பிரிவில் தற்சமயம் பதிவுகள் எதுவும் இல்லை."
            action={
              <Link href="/posts" className="ink-link text-sm font-medium text-accent">
                அனைத்துப் பதிவுகளையும் காண்க
              </Link>
            }
          />
        )}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center gap-5 border-t border-border-color pt-4 text-sm text-text-secondary">
          <Link href="#" className="hover:text-accent">முந்தைய</Link>
          <span>1</span>
          <Link href="#" className="hover:text-accent">அடுத்த</Link>
        </div>
      </div>
    </Container>
  );
}
