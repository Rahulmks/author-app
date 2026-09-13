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
    <Container maxWidth="article" className="py-10 md:py-16">
      <article>
        <p className="eyebrow mb-4">
          {post.category || 'கட்டுரை'}
        </p>
        <h1 className="mb-4 text-3xl font-semibold leading-[1.2] md:text-5xl">
          {post.title}
        </h1>

        <div className="mb-8">
          <p className="mb-3 text-base leading-7 text-text-secondary">
            {post.excerpt}
          </p>
          <PostMetadata
            author={post.author || 'எழுத்தாளர்'}
            publishedAt={post.publishedAt || new Date().toISOString()}
            readingTime={post.readingTimeMinutes}
          />
        </div>

        {post.coverImage && (
          <div className="manuscript-card mb-8 overflow-hidden p-3">
            <div className="relative aspect-[16/8] overflow-hidden border border-border-color bg-paper">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
            </div>
          </div>
        )}

        <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Container>
  );
}
