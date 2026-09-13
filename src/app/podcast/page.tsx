import Container from '@/components/layout/Container';
import PodcastCard from '@/components/media/PodcastCard';
import EmptyState from '@/components/ui/EmptyState';
import { getPodcasts } from '@/lib/podcasts/get-podcasts';

export default async function PodcastPage() {
  const podcasts = await getPodcasts();

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mb-8">
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
          ஒலிப்பதிவு
        </p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
          சமீபத்திய உரையாடல்கள்
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          வாசிப்பு, எழுத்து, அன்றாட வாழ்க்கை, மொழி ஆகியவற்றைச் சுற்றி நகரும் சிந்தனையுள்ள
          பேச்சுகள் மற்றும் நேர்காணல்கள்.
        </p>
      </div>

      <div className="max-w-3xl divide-y divide-border-color border-t border-border-color pt-2">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>

      {podcasts.length === 0 && (
        <EmptyState message="புதிய அத்தியாயங்கள் பதிவாகிக் கொண்டிருக்கின்றன. விரைவில் கேட்கலாம்." />
      )}
    </Container>
  );
}
