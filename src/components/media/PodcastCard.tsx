import Image from 'next/image';
import { Podcast } from '@/types/podcast';
import { formatTamilDate, formatTamilEpisode } from '@/lib/navigation';

interface PodcastCardProps {
  podcast: Podcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <article className="group border-t border-border-color py-4 md:py-5 first:border-t-0">
      <div className="flex items-start gap-4">
        {podcast.coverImage && (
          <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 overflow-hidden rounded border border-border-color/60 bg-paper">
            <Image
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
            {podcast.episodeNumber && (
              <span>{formatTamilEpisode(podcast.episodeNumber)}</span>
            )}
            {podcast.episodeNumber && podcast.duration && <span>·</span>}
            {podcast.duration && <span className="text-text-secondary font-normal tracking-normal">{podcast.duration}</span>}
            {podcast.publishedAt && (
              <span className="text-text-secondary font-normal tracking-normal">
                · <time dateTime={podcast.publishedAt}>{formatTamilDate(podcast.publishedAt)}</time>
              </span>
            )}
          </div>
          
          <h3 className="mb-1 text-base md:text-lg font-medium leading-snug transition-colors group-hover:text-accent">
            {podcast.title}
          </h3>
          
          {podcast.description && (
            <p className="mb-2 line-clamp-2 text-xs md:text-sm leading-relaxed text-text-secondary">
              {podcast.description}
            </p>
          )}
          
          <div className="flex items-center gap-3">
            {podcast.platforms?.spotify && (
              <a
                href={podcast.platforms.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link text-xs font-medium text-accent"
              >
                Spotify
              </a>
            )}
            {podcast.platforms?.apple && (
              <a
                href={podcast.platforms.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link text-xs font-medium text-accent"
              >
                Apple
              </a>
            )}
            {podcast.platforms?.youtube && (
              <a
                href={podcast.platforms.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link text-xs font-medium text-accent"
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
