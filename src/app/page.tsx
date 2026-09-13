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
import { getUpcomingEvents } from '@/data/events';
import { getBooks } from '@/lib/books/get-books';
import { siteConfig } from '@/lib/navigation';
import { getPodcasts } from '@/lib/podcasts/get-podcasts';
import { getPost } from '@/lib/posts/get-post';
import { getPosts } from '@/lib/posts/get-posts';
import { getVideos } from '@/lib/videos/get-videos';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

export default async function HomePage() {
  const posts = await getPosts();
  const featuredPost = posts[0] ? await getPost(posts[0].slug) : null;
  const latestPosts = posts.slice(0, 3);
  const books = await getBooks();
  const videos = await getVideos();
  const podcasts = await getPodcasts();
  const upcomingEvents = getUpcomingEvents().slice(0, 2);

  return (
    <>
      <section className="py-10 md:py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5">{siteConfig.authorTitle}</p>
              <h1 className="mb-5">{siteConfig.authorName}</h1>
              <p className="max-w-xl text-lg leading-8 text-text-secondary md:text-xl">
                நினைவின் விளிம்பில் நின்று, இடங்களின் மெளனத்தையும் மனிதர்களின் உள் உலகத்தையும்
                பதிவு செய்யும் எழுத்துகள். தமிழ் மற்றும் ஆங்கிலத்தின் இடையே நகரும் இந்தத் தளம்,
                ஒரு படைப்பாளியின் மெதுவான கையெழுத்தைப் போல அமைந்துள்ளது.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link href="/posts" className="ink-link text-sm font-medium uppercase tracking-[0.18em] text-accent">
                  வாசிக்கத் தொடங்குங்கள்
                </Link>
                <Link href="/about" className="ink-link text-sm font-medium uppercase tracking-[0.18em] text-text-secondary">
                  எழுத்தாளர் பற்றி
                </Link>
              </div>
            </div>

            <div className="border-t border-border-color pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-10">
              <p className="section-kicker">01 / Notebook</p>
              <p className="text-base leading-8 text-text-secondary">
                ஒரு நல்ல வாக்கியம் வாசகரின் நினைவில் நிழலாக அல்ல, வாசம் போலத் தங்க வேண்டும்.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {featuredPost && (
        <section className="py-10 md:py-16">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-border-color pb-5">
              <span className="section-kicker">02 / Featured</span>
              <Link href="/posts" className="ink-link text-[0.7rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
                அனைத்து எழுத்துகளும்
              </Link>
            </div>
            <FeaturedPost post={featuredPost} />
          </Container>
        </section>
      )}

      <section className="py-10 md:py-16">
        <Container>
          <SectionHeading subtitle="சமீபத்திய பதிவுகள் ஒரு இலக்கிய இதழின் அட்டைப்பக்கத் தேர்வைப் போலத் தொகுக்கப்பட்டுள்ளன.">
            சமீபத்திய எழுத்துகள்
          </SectionHeading>
          <div className="archive-list">
            {latestPosts.map((post) => (
              <div key={post.id} className="archive-item">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-border-color pb-5">
            <span className="section-kicker">03 / Books</span>
            <Link href="/books" className="ink-link text-[0.7rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
              browse library
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-border-color pb-5">
            <span className="section-kicker">04 / Events</span>
            <Link href="/events" className="ink-link text-[0.7rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
              calendar
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-border-color pb-5">
            <span className="section-kicker">05 / Conversations</span>
            <Link href="/videos" className="ink-link text-[0.7rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
              archive
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {videos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-16">
        <Container>
          <div className="grid items-center gap-8 border-t border-border-color pt-12 md:grid-cols-[0.85fr_1.15fr]">
            <div className="manuscript-card p-4">
              <div className="relative aspect-[4/5] overflow-hidden border border-border-color bg-paper">
                <Image
                  src={resolveImagePath('/images/author/profile.svg') ?? '/images/author/profile.svg'}
                  alt="எழுத்தாளர் குறித்த படம்"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="section-kicker">06 / About</p>
              <h2 className="mb-5">அனுபவம், நினைவு, மெளனம் ஆகிய மூன்றின் இடைவெளியில் எழுத்து பிறக்கிறது.</h2>
              <p className="mb-6 text-lg leading-8 text-text-secondary">
                குடும்ப வரலாறு, சொந்த ஊரின் ஒலி, அன்றாட வாழ்க்கையின் சிறிய இடைவெளிகள்,
                மொழி மாறும்போதும் மாறாத உணர்வுகள் ஆகியவற்றைத் தொடர்ந்தே இந்தப் படைப்புகள் நகர்கின்றன.
              </p>
              <Link href="/about" className="ink-link inline-flex items-center text-sm font-medium uppercase tracking-[0.18em] text-accent">
                மேலும் படிக்க
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
