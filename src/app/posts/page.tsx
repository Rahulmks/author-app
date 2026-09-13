import Link from 'next/link';
import { notFound } from 'next/navigation';

import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import { getPosts } from '@/lib/posts/get-posts';

const postCategories = [
  'அனைத்தும்',
  'கட்டுரை',
  'சிறுகதை',
  'இலக்கிய விமர்சனம்',
  'புதின ஆய்வு',
  'காப்பிய இலக்கியம்',
  'குறுங்கற்பனை கதைகள்',
  'சிந்தனைகள்',
  'பொது',
];

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { category: activeCategory } = (await searchParams) || {};
  const allPosts = await getPosts();

  if (!allPosts.length) {
    notFound();
  }

  const posts = activeCategory && activeCategory !== 'அனைத்தும்'
    ? allPosts.filter((post) => {
        if (!post.category) return false;
        const postCat = post.category.trim().toLowerCase();
        const activeCat = activeCategory.trim().toLowerCase();
        if (postCat === activeCat) return true;

        if (activeCategory === 'கட்டுரை' && (postCat.includes('essay') || postCat.includes('கட்டுரை'))) return true;
        if (activeCategory === 'சிறுகதை' && (postCat.includes('story') || postCat.includes('சிறுகதை'))) return true;
        if (activeCategory === 'இலக்கிய விமர்சனம்' && (postCat.includes('criticism') || postCat.includes('விமர்சனம்'))) return true;
        if (activeCategory === 'புதின ஆய்வு' && (postCat.includes('novel') || postCat.includes('ஆய்வு'))) return true;
        if (activeCategory === 'காப்பிய இலக்கியம்' && (postCat.includes('epic') || postCat.includes('காப்பியம்'))) return true;
        if (activeCategory === 'குறுங்கற்பனை கதைகள்' && (postCat.includes('flash') || postCat.includes('குறுங்கற்பனை'))) return true;
        if (activeCategory === 'சிந்தனைகள்' && (postCat.includes('reflection') || postCat.includes('writing') || postCat.includes('சிந்தனை'))) return true;
        if (activeCategory === 'பொது' && (postCat.includes('general') || postCat.includes('பொது'))) return true;
        return false;
      })
    : allPosts;

  return (
    <Container className="py-12 md:py-20">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow mb-4">எழுத்துகள்</p>
        <h1 className="mb-5">கட்டுரைகள், கதைகள், மனநினைவுகள்</h1>
        <p className="text-lg leading-8 text-text-secondary">
          விளிம்புகளில் எழுதப்பட்ட குறிப்புகள், நிலமும் நினைவும் குறித்த கவனிப்புகள்,
          வாசித்துப் பின் நீண்ட நேரம் மனதில் தங்கும் சிறு கதைகள்.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 border-t border-border-color pt-5">
          {postCategories.map((category) => {
            const isActive = (!activeCategory && category === 'அனைத்தும்') || activeCategory === category;
            const href = category === 'அனைத்தும்' ? '/posts' : `/posts?category=${encodeURIComponent(category)}`;
            return (
              <Link
                key={category}
                href={href}
                className={`text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                  isActive ? 'text-accent' : 'text-text-secondary hover:text-accent'
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="archive-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="archive-item">
              <PostCard post={post as any} />
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-text-secondary">இந்தப் பிரிவில் தற்சமயம் பதிவுகள் எதுவும் இல்லை.</p>
            <Link href="/posts" className="mt-4 inline-block text-sm font-medium text-accent underline">
              அனைத்துப் பதிவுகளையும் காண்க
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}
