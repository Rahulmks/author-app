import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import PostCard from '@/components/posts/PostCard';
import FeaturedPost from '@/components/posts/FeaturedPost';
import BookCard from '@/components/books/BookCard';
import EventCard from '@/components/events/EventCard';
import VideoCard from '@/components/media/VideoCard';
import PodcastCard from '@/components/media/PodcastCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { getFeaturedPost, getLatestPosts } from '@/data/posts';
import { mockBooks } from '@/data/books';
import { getUpcomingEvents } from '@/data/events';
import { mockVideos } from '@/data/videos';
import { mockPodcasts } from '@/data/podcasts';
import { siteConfig } from '@/lib/navigation';

export default function HomePage() {
  const featuredPost = getFeaturedPost();
  const latestPosts = getLatestPosts(3);
  const upcomingEvents = getUpcomingEvents().slice(0, 2);

  return (
    <>
      <section className="py-10 md:py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
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
                  className="inline-flex items-center rounded-full border border-[rgba(138,90,60,0.3)] bg-[rgba(255,249,242,0.9)] px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
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
              <div className="manuscript-card overflow-hidden rounded-[2rem] p-4 md:p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-neutral-200">
                  <Image
                    src="/images/author/portrait.svg"
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

      <section className="py-12 md:py-20">
        <Container>
          <SectionHeading subtitle="சமீபத்திய பதிவுகள் ஒரு இலக்கிய இதழின் அட்டைப்பக்கத் தேர்வைப் போலத் தொகுக்கப்பட்டுள்ளன.">
            சமீபத்திய எழுத்துகள்
          </SectionHeading>
          <div className="grid gap-10 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {featuredPost && (
        <section className="py-12 md:py-20">
          <Container>
            <SectionHeading subtitle="இப்போது வாசிக்க வேண்டிய ஒரு முக்கிய உரை.">
              சிறப்புப் பதிவு
            </SectionHeading>
            <FeaturedPost post={featuredPost} />
          </Container>
        </section>
      )}

      <section className="py-12 md:py-20">
        <Container>
          <SectionHeading subtitle="நூல்கள் ஒரு பட்டியலாக அல்ல, தனித் தனிப் படைப்புகளாகச் சுவாசிக்கட்டும்.">
            நூல்கள்
          </SectionHeading>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {mockBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <SectionHeading subtitle="நிகழும் சந்திப்புகள், வாசிப்பு மாலைகள், கைவினை உரையாடல்கள்.">
            நிகழ்வுகள்
          </SectionHeading>
          <div className="grid gap-8 lg:grid-cols-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/events" className="ink-link text-sm font-medium text-accent">
              அனைத்து நிகழ்வுகளையும் பார்க்க
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <SectionHeading subtitle="வாசிப்புகள், உரையாடல்கள், குரலின் அடுக்குகள்.">
            காணொளிகள்
          </SectionHeading>
          <div className="grid gap-8 md:grid-cols-3">
            {mockVideos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <SectionHeading subtitle="கேட்கத்தக்க சிந்தனைகள் மற்றும் மெதுவான உரையாடல்கள்.">
            ஒலிப்பதிவு
          </SectionHeading>
          <div className="space-y-5">
            {mockPodcasts.slice(0, 2).map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <div className="grid items-center gap-8 border-t border-border-color pt-12 md:grid-cols-[0.9fr_1.1fr]">
            <div className="manuscript-card rounded-[2rem] p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-border-color bg-neutral-200">
              <Image
                src="/images/author/profile.svg"
                alt="எழுத்தாளர் குறித்த படம்"
                fill
                className="object-cover"
              />
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">
                எழுத்தாளர் குறித்துத்
              </p>
              <h2 className="mb-5 text-3xl font-semibold md:text-4xl">
                அனுபவம், நினைவு, மெளனம் ஆகிய மூன்றின் இடைவெளியில் எழுத்து பிறக்கிறது.
              </h2>
              <p className="mb-6 text-lg leading-8 text-text-secondary">
                குடும்ப வரலாறு, சொந்த ஊரின் ஒலி, அன்றாட வாழ்க்கையின் சிறிய இடைவெளிகள்,
                மொழி மாறும்போதும் மாறாத உணர்வுகள் ஆகியவற்றைத் தொடர்ந்தே இந்தப் படைப்புகள் நகர்கின்றன.
              </p>
              <Link
                href="/about"
                className="ink-link inline-flex items-center text-sm font-medium text-accent"
              >
                மேலும் படிக்க
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
