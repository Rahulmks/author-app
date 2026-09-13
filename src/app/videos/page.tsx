import Link from 'next/link';
import Container from '@/components/layout/Container';
import VideoCard from '@/components/media/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { getVideos } from '@/lib/videos/get-videos';

const videoCategories = ['அனைத்தும்', 'நேர்காணல்கள்', 'விவாதம்', 'பட்டறை', 'பொது'];

interface VideosPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const { category: activeCategory } = (await searchParams) || {};
  const allVideos = await getVideos();

  const videos = activeCategory && activeCategory !== 'அனைத்தும்'
    ? allVideos.filter((video) => {
        if (!video.category) return false;
        const videoCat = video.category.trim().toLowerCase();
        const activeCat = activeCategory.trim().toLowerCase();
        if (videoCat === activeCat) return true;

        if (activeCategory === 'நேர்காணல்கள்' && (videoCat.includes('interview') || videoCat.includes('நேர்காணல்'))) return true;
        if (activeCategory === 'விவாதம்' && (videoCat.includes('discussion') || videoCat.includes('விவாதம்'))) return true;
        if (activeCategory === 'பட்டறை' && (videoCat.includes('workshop') || videoCat.includes('பட்டறை'))) return true;
        if (activeCategory === 'பொது' && (videoCat.includes('general') || videoCat.includes('பொது'))) return true;
        return false;
      })
    : allVideos;

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mb-8">
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
          காணொளிகள்
        </p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
          உரையாடல்கள் மற்றும் வாசிப்புகள்
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          பட்டறைகள், நிகழ்வுகள், நேர்காணல்கள் மற்றும் இலக்கியம் குறித்த தனிப்பட்ட உரையாடல்களிலிருந்து
          தேர்ந்தெடுக்கப்பட்ட காட்சி பதிவுகள்.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {videoCategories.map((category) => {
            const isActive = (!activeCategory && category === 'அனைத்தும்') || activeCategory === category;
            const href = category === 'அனைத்தும்' ? '/videos' : `/videos?category=${encodeURIComponent(category)}`;
            return (
              <Link
                key={category}
                href={href}
                className={`border-b pb-0.5 text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:border-accent hover:text-accent'
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <EmptyState
          message="இந்தப் பிரிவில் தற்சமயம் காணொளிகள் எதுவும் இல்லை."
          action={
            <Link href="/videos" className="ink-link text-sm font-medium text-accent">
              அனைத்துக் காணொளிகளையும் காண்க
            </Link>
          }
        />
      )}
    </Container>
  );
}
