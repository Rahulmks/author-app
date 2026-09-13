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
        <p className="eyebrow mb-4">
          {post.category || 'கட்டுரை'}
        </p>
        <h1 className="mb-5 text-4xl font-semibold leading-[1.12] md:text-6xl">
          {post.title}
        </h1>

        <div className="mb-8">
          <p className="mb-4 text-lg leading-8 text-text-secondary">
            {post.excerpt}
          </p>
          <PostMetadata
            author={post.author || 'எழுத்தாளர்'}
            publishedAt={post.publishedAt || new Date().toISOString()}
            readingTime={post.readingTimeMinutes}
          />
        </div>

        {post.coverImage && (
          <div className="manuscript-card mb-10 overflow-hidden rounded-[2rem] p-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-border-color bg-paper">
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
