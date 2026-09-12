import Container from '@/components/layout/Container';
import VideoCard from '@/components/media/VideoCard';
import { getVideos } from '@/lib/videos/get-videos';

const videoCategories = ['நேர்காணல்கள்', 'விவாதம்', 'பொது'];

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <p className="eyebrow mb-4">
          காணொளிகள்
        </p>
        <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
          உரையாடல்கள் மற்றும் வாசிப்புகள்
        </h1>
        <p className="text-lg leading-8 text-text-secondary">
          பட்டறைகள், நிகழ்வுகள், நேர்காணல்கள் மற்றும் இலக்கியம் குறித்த தனிப்பட்ட உரையாடல்களிலிருந்து
          தேர்ந்தெடுக்கப்பட்ட காட்சி பதிவுகள்.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {videoCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border-color bg-[rgba(255,249,242,0.8)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-text-secondary"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </Container>
  );
}
