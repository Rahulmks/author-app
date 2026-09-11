import Container from '@/components/layout/Container';
import VideoCard from '@/components/media/VideoCard';
import { getVideos } from '@/lib/videos/get-videos';

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
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </Container>
  );
}
