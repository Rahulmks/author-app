'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoLink = video.url ?? video.videoUrl;
  const youtubeId = getYouTubeId(videoLink) || getYouTubeId(video.videoUrl);

  const rawThumbnail = video.thumbnailImage || video.thumbnailUrl || video.thumbnail;
  const thumbnail = rawThumbnail && !rawThumbnail.includes('placeholder.svg')
    ? rawThumbnail
    : youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : '/images/placeholder.svg';

  return (
    <article className="group flex flex-col h-full rounded-lg border border-border-color/60 bg-paper/30 p-3 transition-colors hover:border-accent/60">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-border-color mb-3">
        {isPlaying && youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              if (youtubeId) {
                setIsPlaying(true);
              } else if (videoLink) {
                window.open(videoLink, '_blank', 'noopener,noreferrer');
              }
            }}
            className="relative h-full w-full block text-left group/thumb"
            aria-label={`${video.title} காணொளியை இயக்குக`}
          >
            <Image
              src={thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/thumb:bg-black/15 transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background/85 text-foreground border border-border-color/60 shadow-lg group-hover/thumb:scale-110 transition-transform">
                <svg className="h-5 w-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration Badge */}
            {video.duration && (
              <span className="absolute bottom-2 right-2 rounded bg-background/90 px-1.5 py-0.5 font-mono text-[0.68rem] tracking-wider text-foreground backdrop-blur-sm border border-border-color/30">
                {video.duration}
              </span>
            )}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          {video.category && (
            <p className="mb-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-accent">
              {video.category}
            </p>
          )}

          <h3 className="mb-1.5 line-clamp-2 text-sm md:text-base font-medium leading-snug text-text-primary group-hover:text-accent transition-colors">
            {video.title}
          </h3>

          {video.description && (
            <p className="line-clamp-2 text-xs text-text-secondary leading-relaxed mb-3">
              {video.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border-color/40 text-[0.72rem] text-text-secondary">
          {video.platform && <span className="capitalize">{video.platform}</span>}
          {video.platform && video.duration && <span>·</span>}
          {video.duration && <span>{video.duration}</span>}
        </div>
      </div>
    </article>
  );
}
