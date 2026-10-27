import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/layout/Container';
import FeaturedPost from '@/components/posts/FeaturedPost';
import SectionHeading from '@/components/ui/SectionHeading';
import ManuscriptDivider from '@/components/ui/ManuscriptDivider';
import HeroSection from '@/components/home/HeroSection';
import AwardsStrip from '@/components/home/AwardsStrip';
import QuoteGrid from '@/components/home/QuoteGrid';
import PostGridCard from '@/components/home/PostGridCard';
import { getAboutPage } from '@/lib/pages/about-page';
import { getPost } from '@/lib/posts/get-post';
import { getPosts } from '@/lib/posts/get-posts';

export default async function HomePage() {
  const t = await getTranslations('home');
  const quotes = t.raw('quotes') as string[];
  const [posts, about] = await Promise.all([getPosts(), getAboutPage()]);

  const featuredSummary = posts
    .filter((post) => post.featured)
    .sort((first, second) => {
      const firstTime = first.publishedAt ? new Date(first.publishedAt).getTime() : 0;
      const secondTime = second.publishedAt ? new Date(second.publishedAt).getTime() : 0;
      return secondTime - firstTime;
    })[0];
  const featuredPost = featuredSummary ? await getPost(featuredSummary.slug) : null;
  const latestPosts = posts.filter((post) => post.slug !== featuredPost?.slug).slice(0, 3);

  return (
    <>
      <HeroSection />
      <AwardsStrip awards={about?.awards ?? []} />

      {featuredPost && (
        <>
          <section className="py-8 md:py-14">
            <Container>
              <SectionHeading subtitle={t('featuredSubtitle')}>
                {t('featured')}
              </SectionHeading>
              <FeaturedPost post={featuredPost} />
            </Container>
          </section>
          <ManuscriptDivider />
        </>
      )}

      <QuoteGrid quotes={quotes} />

      {latestPosts.length > 0 && (
        <section className="py-8 md:py-14">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold md:text-3xl">{t('latest')}</h2>
                <p className="mt-2 max-w-2xl text-base leading-8 text-text-secondary">
                  {t('latestSubtitle')}
                </p>
              </div>
              <Link href="/posts" className="ink-link inline-flex min-h-11 items-center whitespace-nowrap text-sm">
                {t('viewAll')}
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostGridCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
