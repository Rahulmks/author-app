import Image from 'next/image';
import { Podcast } from '@/types/podcast';
import { formatTamilDate, formatTamilEpisode } from '@/lib/navigation';

interface PodcastCardProps {
  podcast: Podcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <article className="group border-t border-border-color py-6 transition-colors hover:border-accent">
      <div className="flex gap-5">
        {podcast.coverImage && (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-border-color">
            <Image
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {podcast.episodeNumber && (
            <p className="mb-1 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-accent">
              {formatTamilEpisode(podcast.episodeNumber)}
            </p>
          )}
          
          <h3 className="mb-2 line-clamp-2 text-lg font-medium transition-colors group-hover:text-accent md:text-xl">
            {podcast.title}
          </h3>
          
          {podcast.description && (
            <p className="mb-3 line-clamp-2 text-sm leading-7 text-text-secondary">
              {podcast.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
            {podcast.duration && <span>{podcast.duration}</span>}
            {podcast.duration && podcast.publishedAt && <span>·</span>}
            {podcast.publishedAt && (
              <time dateTime={podcast.publishedAt}>
                {formatTamilDate(podcast.publishedAt)}
              </time>
            )}
          </div>
          
          <div className="flex gap-3 mt-3">
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
