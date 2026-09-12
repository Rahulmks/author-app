import Link from 'next/link';
import { notFound } from 'next/navigation';

import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import { getPosts } from '@/lib/posts/get-posts';

const postCategories = [
  'பொது',
  'சிறுகதை',
  'கட்டுரை',
  'குறுங்கற்பனை கதைகள்',
];

export default async function PostsPage() {
  const posts = await getPosts();

  if (!posts.length) {
    notFound();
  }

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <p className="eyebrow mb-4">
          எழுத்துகள்
        </p>
        <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
          கட்டுரைகள், கதைகள், மனநினைவுகள்
        </h1>
        <p className="text-lg leading-8 text-text-secondary">
          விளிம்புகளில் எழுதப்பட்ட குறிப்புகள், நிலமும் நினைவும் குறித்த கவனிப்புகள்,
          வாசித்துப் பின் நீண்ட நேரம் மனதில் தங்கும் சிறு கதைகள்.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {postCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border-color bg-[rgba(255,249,242,0.8)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-text-secondary"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border-color pt-10">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post as any} />
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-border-color px-5 py-3 text-sm text-text-secondary">
          <Link href="#" className="hover:text-accent">முந்தைய</Link>
          <span>1</span>
          <Link href="#" className="hover:text-accent">அடுத்த</Link>
        </div>
      </div>
    </Container>
  );
}
