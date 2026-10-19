import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/layout/Container';
import VideoCard from '@/components/media/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { getVideos } from '@/lib/videos/get-videos';

// Stored values stay Tamil so existing ?category= URLs and data keep matching.
const ALL_CATEGORY = 'அனைத்தும்';
const videoCategories = [
  { value: ALL_CATEGORY, key: 'all' },
  { value: 'நேர்காணல்கள்', key: 'interviews' },
  { value: 'விவாதம்', key: 'discussion' },
  { value: 'பட்டறை', key: 'workshop' },
  { value: 'பொது', key: 'general' },
] as const;

interface VideosPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const t = await getTranslations('videos');
  const { category: activeCategory } = (await searchParams) || {};
  const allVideos = await getVideos();

  const videos = activeCategory && activeCategory !== ALL_CATEGORY
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
        <p className="eyebrow mb-2">
          {t('eyebrow')}
        </p>
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">
          {t('heading')}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          {t('body')}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {videoCategories.map(({ value: category, key }) => {
            const isActive = (!activeCategory && category === ALL_CATEGORY) || activeCategory === category;
            const href = category === ALL_CATEGORY ? '/videos' : `/videos?category=${encodeURIComponent(category)}`;
            return (
              <Link
                key={category}
                href={href}
                className={`label inline-flex min-h-11 items-center border-b-2 text-text-primary transition-colors ${
                  isActive
                    ? 'border-pink font-bold'
                    : 'border-transparent hover:border-line'
                }`}
              >
                {t(key)}
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
          message={t('empty')}
          action={
            <Link href="/videos" className="ink-link inline-flex min-h-11 items-center text-sm">
              {t('viewAll')}
            </Link>
          }
        />
      )}
    </Container>
  );
}
