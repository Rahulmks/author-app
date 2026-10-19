import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import Container from '@/components/layout/Container';
import PostMetadata from '@/components/posts/PostMetadata';
import ReadingProgressBar from '@/components/ui/ReadingProgressBar';
import { getPost } from '@/lib/posts/get-post';
import { getPosts } from '@/lib/posts/get-posts';
import { getCategoryLabelKey } from '@/lib/posts/categories';

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  const t = await getTranslations('posts');
  const tNav = await getTranslations('nav');

  if (!post) {
    notFound();
  }

  const categoryKey = getCategoryLabelKey(post.category);
  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <ReadingProgressBar />
      <Container className="py-8 md:py-12">
        <article className="paper-panel mx-auto max-w-[76ch] p-6 md:p-10">
          {/* Top Wayfinding */}
          <div className="mb-6">
            <Link
              href="/posts"
              className="label inline-flex min-h-11 items-center transition-colors hover:underline underline-offset-4"
            >
              {t('backToAll')}
            </Link>
          </div>

          <header className="mb-6">
            <p className="eyebrow mb-2">
              {categoryKey ? tNav(categoryKey) : post.category || t('defaultCategory')}
            </p>
            <h1 className="mb-3 text-2xl font-bold leading-snug md:text-4xl">
              {post.title}
            </h1>

          {post.excerpt && (
            <p className="mb-4 font-display text-sm italic leading-relaxed text-text-secondary md:text-base">
              {post.excerpt}
            </p>
          )}

          <div className="my-4 border-y border-line py-2.5">
            <PostMetadata
              author={post.author || undefined}
              publishedAt={post.publishedAt || new Date().toISOString()}
              readingTime={post.readingTimeMinutes}
            />
          </div>
        </header>

        {post.coverImage && (
          <figure className="mx-auto mb-8 max-w-[80%]">
            <div className="media-frame relative aspect-[16/10]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </figure>
        )}

        <div className="article-content space-y-6 text-base leading-relaxed text-text-primary" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Compact Next/Prev Links */}
        <nav aria-label={t('wayfinding')} className="mt-10 border-t border-line pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {prevPost ? (
              <Link href={`/posts/${prevPost.slug}`} className="group block min-h-11 space-y-1 rounded-lg border border-line bg-cream p-3 transition-colors hover:border-ink-soft">
                <span className="label">{t('previousPost')}</span>
                <p className="mb-0 line-clamp-1 font-semibold text-text-primary group-hover:underline underline-offset-4">{prevPost.title}</p>
              </Link>
            ) : <div />}
            
            {nextPost && (
              <Link href={`/posts/${nextPost.slug}`} className="group block min-h-11 space-y-1 rounded-lg border border-line bg-cream p-3 text-right transition-colors hover:border-ink-soft sm:col-start-2">
                <span className="label">{t('nextPost')}</span>
                <p className="mb-0 line-clamp-1 font-semibold text-text-primary group-hover:underline underline-offset-4">{nextPost.title}</p>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </Container>
    </>
  );
}
