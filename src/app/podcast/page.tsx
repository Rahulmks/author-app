import Container from '@/components/layout/Container';
import PodcastCard from '@/components/media/PodcastCard';
import { getPodcasts } from '@/lib/podcasts/get-podcasts';

export default async function PodcastPage() {
  const podcasts = await getPodcasts();

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <p className="eyebrow mb-4">
          ஒலிப்பதிவு
        </p>
        <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
          சமீபத்திய உரையாடல்கள்
        </h1>
        <p className="text-lg leading-8 text-text-secondary">
          வாசிப்பு, எழுத்து, அன்றாட வாழ்க்கை, மொழி ஆகியவற்றைச் சுற்றி நகரும் சிந்தனையுள்ள
          பேச்சுகள் மற்றும் நேர்காணல்கள்.
        </p>
      </div>

      <div className="space-y-5">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </Container>
  );
}
