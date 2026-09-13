import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Container from '@/components/layout/Container';
import PostMetadata from '@/components/posts/PostMetadata';
import ReadingProgressBar from '@/components/ui/ReadingProgressBar';
import { getPost } from '@/lib/posts/get-post';
import { getPosts } from '@/lib/posts/get-posts';

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <ReadingProgressBar />
      <Container className="py-8 md:py-12">
        <article className="max-w-[68ch] mx-auto">
          {/* Top Wayfinding */}
          <div className="mb-6">
            <Link
              href="/posts"
              className="inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-text-secondary hover:text-accent transition-colors"
            >
              ← தமிழ் எழுத்துகள் அனைத்தும்
            </Link>
          </div>

          <header className="mb-6">
            <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
              {post.category || 'கட்டுரை'}
            </p>
            <h1 className="mb-3 text-2xl font-semibold leading-snug md:text-4xl">
              {post.title}
            </h1>

          {post.excerpt && (
            <p className="mb-4 text-sm md:text-base leading-relaxed text-text-secondary font-serif italic">
              {post.excerpt}
            </p>
          )}

          <div className="border-y border-border-color py-2.5 my-4">
            <PostMetadata
              author={post.author || 'எழுத்தாளர்'}
              publishedAt={post.publishedAt || new Date().toISOString()}
              readingTime={post.readingTimeMinutes}
            />
          </div>
        </header>

        {post.coverImage && (
          <figure className="mb-8 max-w-[80%] mx-auto">
            <div className="relative aspect-[16/10] overflow-hidden rounded border border-border-color/60 bg-paper">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </figure>
        )}

        <div className="article-content text-base md:text-lg leading-relaxed text-text-primary space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Compact Next/Prev Links */}
        <nav aria-label="பதிவு வழிகாட்டல்" className="mt-10 border-t border-border-color pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
            {prevPost ? (
              <Link href={`/posts/${prevPost.slug}`} className="group block space-y-1 p-3 rounded border border-border-color/40 hover:border-accent/60 transition-colors">
                <span className="text-[0.68rem] uppercase tracking-wider text-text-secondary group-hover:text-accent">← முந்தைய பதிவு</span>
                <p className="font-medium text-text-primary group-hover:text-accent line-clamp-1">{prevPost.title}</p>
              </Link>
            ) : <div />}
            
            {nextPost && (
              <Link href={`/posts/${nextPost.slug}`} className="group block space-y-1 p-3 rounded border border-border-color/40 hover:border-accent/60 transition-colors text-right sm:col-start-2">
                <span className="text-[0.68rem] uppercase tracking-wider text-text-secondary group-hover:text-accent">அடுத்த பதிவு →</span>
                <p className="font-medium text-text-primary group-hover:text-accent line-clamp-1">{nextPost.title}</p>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </Container>
    </>
  );
}
