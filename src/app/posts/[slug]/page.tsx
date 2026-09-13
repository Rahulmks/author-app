import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Container from '@/components/layout/Container';
import PostMetadata from '@/components/posts/PostMetadata';
import { getPost } from '@/lib/posts/get-post';

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container maxWidth="article" className="py-12 md:py-20">
      <article>
        <p className="eyebrow mb-4">{post.category || 'கட்டுரை'}</p>
        <h1 className="mb-5">{post.title}</h1>

        <div className="mb-10 border-y border-border-color py-5">
          <p className="mb-4 text-lg leading-8 text-text-secondary">{post.excerpt}</p>
          <PostMetadata
            author={post.author || 'எழுத்தாளர்'}
            publishedAt={post.publishedAt || new Date().toISOString()}
            readingTime={post.readingTimeMinutes}
          />
        </div>

        {post.coverImage && (
          <div className="mb-12 border border-border-color bg-paper p-3">
            <div className="relative aspect-[16/9] overflow-hidden border border-border-color bg-paper">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
            </div>
          </div>
        )}

        <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-16 border-t border-border-color pt-8">
          <div className="flex items-center justify-between gap-4 text-sm uppercase tracking-[0.18em] text-text-secondary">
            <Link href="/posts" className="ink-link text-accent">← Back to writings</Link>
            <span>Endnote</span>
          </div>
        </div>
      </article>
    </Container>
  );
}
