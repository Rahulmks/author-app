import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import FeaturedPost from '@/components/posts/FeaturedPost';
import SectionHeading from '@/components/ui/SectionHeading';
import ManuscriptDivider from '@/components/ui/ManuscriptDivider';
import { siteConfig } from '@/lib/navigation';
import { getPost } from '@/lib/posts/get-post';
import { getPosts } from '@/lib/posts/get-posts';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

export default async function HomePage() {
  const posts = await getPosts();
  const featuredSummary = posts
    .filter((post) => post.featured)
    .sort((first, second) => {
      const firstTime = first.publishedAt ? new Date(first.publishedAt).getTime() : 0;
      const secondTime = second.publishedAt ? new Date(second.publishedAt).getTime() : 0;
      return secondTime - firstTime;
    })[0];
  const featuredPost = featuredSummary ? await getPost(featuredSummary.slug) : null;
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="py-10 md:py-16 lg:py-20">
        <Container>
            <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="paper-panel grain-border rounded-[2.25rem] p-7 md:p-10 lg:p-12">
              <p className="eyebrow mb-5">
                {siteConfig.authorTitle}
              </p>
              <h1 className="mb-6 text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-6xl">
                {siteConfig.authorName}
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-text-secondary md:text-xl">
                நினைவின் விளிம்பில் நின்று, இடங்களின் மெளனத்தையும் மனிதர்களின் உள் உலகத்தையும்
                பதிவு செய்யும் எழுத்துகள். தமிழ் மற்றும் ஆங்கிலத்தின் இடையே நகரும் இந்த
                தளம், ஒரு படைப்பாளியின் மெதுவான கையெழுத்தைப் போல வடிவமைக்கப்பட்டுள்ளது.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/posts"
                    className="ink-link inline-flex items-center text-sm font-medium text-accent"
                >
                  எழுதுகளை வாசிக்க
                </Link>
                <Link
                  href="/about"
                  className="ink-link inline-flex items-center text-sm font-medium text-text-secondary hover:text-accent"
                >
                  எழுத்தாளரை அறிய
                </Link>
              </div>
            </div>

            <div className="space-y-6">
                <div className="border border-border-color p-3 md:p-4">
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                  <Image
                    src={resolveImagePath('/images/author/profile.png') ?? '/images/author/profile.png'}
                    alt="எழுத்தாளரின் உருவப்படம்"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <blockquote className="pull-quote rounded-[1.5rem] text-base leading-8 text-text-secondary md:text-lg">
                ஒரு நல்ல வாக்கியம் வாசகரின் நினைவில் நிழலாக அல்ல, வாசம் போல தங்க வேண்டும்.
              </blockquote>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="manuscript-card rounded-[1.5rem] p-5">
                  <p className="eyebrow mb-3">மொழிகள்</p>
                  <p className="text-lg text-text-primary">தமிழ் • English</p>
                </div>
                <div className="manuscript-card rounded-[1.5rem] p-5">
                  <p className="eyebrow mb-3">மையங்கள்</p>
                  <p className="text-lg text-text-primary">நினைவு • இடம் • குடும்பம்</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {featuredPost && (
        <>
          <section className="pt-10 md:pt-16">
            <Container>
              <SectionHeading subtitle="இப்போது வாசிக்க வேண்டிய ஒரு முக்கிய உரை.">
                சிறப்புப் பதிவு
              </SectionHeading>
              <FeaturedPost post={featuredPost} />
            </Container>
          </section>
          <ManuscriptDivider />
        </>
      )}

      <section className="py-10 md:py-16">
        <Container>
          <SectionHeading subtitle="சமீபத்திய பதிவுகள் ஒரு இலக்கிய இதழின் அட்டவணை போலத் தொகுக்கப்பட்டுள்ளன.">
            சமீபத்திய எழுத்துகள்
          </SectionHeading>
          <div className="max-w-3xl mx-auto divide-y divide-border-color border-t border-border-color pt-2">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
