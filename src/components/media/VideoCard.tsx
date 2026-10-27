'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('videos');
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
    <article className="card card-tilt group flex h-full flex-col">
      <div className="media-frame relative aspect-[16/9] w-full">
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
            aria-label={t('play', { title: video.title })}
          >
            <Image
              src={thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
            />
            {/* Play Overlay */}
            <div className="scrim absolute inset-0 flex items-center justify-center transition-colors group-hover/thumb:bg-transparent">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-text-primary shadow-card transition-transform group-hover/thumb:scale-110">
                <svg className="h-5 w-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration Badge */}
            {video.duration && (
              <span className="absolute bottom-2 right-2 rounded bg-ink px-1.5 py-0.5 text-xs font-semibold tabular-nums tracking-wider text-white">
                {video.duration}
              </span>
            )}
          </button>
        )}
      </div>

      <div className="card-body justify-between">
        <div className="flex flex-col">
          <h3 className="card-title">
            {video.title}
          </h3>

          {video.category && (
            <p className="label mb-1">
              {video.category}
            </p>
          )}

          {video.description && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">
              {video.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-line pt-2 text-xs text-text-secondary">
          {video.platform && <span className="capitalize">{video.platform}</span>}
          {video.platform && video.duration && <span>·</span>}
          {video.duration && <span>{video.duration}</span>}
        </div>
      </div>
    </article>
  );
}
