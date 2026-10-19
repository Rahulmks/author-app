import Container from '@/components/layout/Container';
import { getTranslations } from 'next-intl/server';
import PodcastCard from '@/components/media/PodcastCard';
import EmptyState from '@/components/ui/EmptyState';
import { getPodcasts } from '@/lib/podcasts/get-podcasts';

export default async function PodcastPage() {
  const podcasts = await getPodcasts();
  const t = await getTranslations('podcastPage');

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mb-8">
        <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
          {t('eyebrow')}
        </p>
        <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
          {t('heading')}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">
          {t('body')}
        </p>
      </div>

      <div className="max-w-3xl divide-y divide-border-color border-t border-border-color pt-2">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>

      {podcasts.length === 0 && (
        <EmptyState message={t('empty')} />
      )}
    </Container>
  );
}
