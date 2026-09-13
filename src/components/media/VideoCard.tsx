import Image from 'next/image';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoLink = video.url ?? video.videoUrl;

  return (
    <article className="group hover-lift border border-border-color p-4 md:p-5">
      <a href={videoLink} target="_blank" rel="noopener noreferrer" className="block">
        {video.thumbnailImage && (
          <div className="relative mb-4 aspect-video overflow-hidden border border-border-color bg-paper">
            <Image
              src={video.thumbnailImage}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(26,18,37,0.22)]">
              <div className="flex h-14 w-14 items-center justify-center bg-[rgba(232,165,72,0.92)]">
                <svg className="ml-1 h-7 w-7 text-[#1A1225]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {video.category && (
          <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-accent">
            {video.category}
          </p>
        )}

        <h3 className="mb-2 text-xl font-semibold leading-tight transition-colors group-hover:text-accent md:text-2xl">
          {video.title}
        </h3>

        {video.description && (
          <p className="mb-4 text-base leading-7 text-text-secondary">{video.description}</p>
        )}

        <div className="flex items-center gap-3 border-t border-border-color pt-4 text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary">
          {video.duration && <span>{video.duration}</span>}
          {video.platform && <span>{video.platform}</span>}
        </div>
      </a>
    </article>
  );
}
