import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Podcast } from '@/types/podcast';
import { formatDate } from '@/lib/navigation';

interface PodcastCardProps {
  podcast: Podcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  return (
    <article className="group border-t border-line py-4 md:py-5 first:border-t-0">
      <div className="flex items-start gap-4">
        {podcast.coverImage && (
          <div className="media-frame relative h-16 w-16 flex-shrink-0 md:h-20 md:w-20">
            <Image
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="label mb-1 flex flex-wrap items-center gap-2">
            {podcast.episodeNumber && (
              <span>{t('episode', { number: podcast.episodeNumber })}</span>
            )}
            {podcast.episodeNumber && podcast.duration && <span>·</span>}
            {podcast.duration && <span className="font-normal normal-case tracking-normal">{podcast.duration}</span>}
            {podcast.publishedAt && (
              <span className="font-normal normal-case tracking-normal">
                · <time dateTime={podcast.publishedAt}>{formatDate(podcast.publishedAt, locale)}</time>
              </span>
            )}
          </div>
          
          <h3 className="mb-1 text-base font-semibold leading-snug md:text-lg">
            {podcast.title}
          </h3>
          
          {podcast.description && (
            <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
              {podcast.description}
            </p>
          )}
          
          <div className="flex items-center gap-3">
            {podcast.platforms?.spotify && (
              <a
                href={podcast.platforms.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link inline-flex min-h-11 items-center text-sm"
              >
                Spotify
              </a>
            )}
            {podcast.platforms?.apple && (
              <a
                href={podcast.platforms.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link inline-flex min-h-11 items-center text-sm"
              >
                Apple
              </a>
            )}
            {podcast.platforms?.youtube && (
              <a
                href={podcast.platforms.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link inline-flex min-h-11 items-center text-sm"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
