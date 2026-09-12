import Image from 'next/image';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoLink = video.url ?? video.videoUrl;

  return (
    <article className="group hover-lift manuscript-card overflow-hidden rounded-[1.75rem] p-4 md:p-5">
      <a href={videoLink} target="_blank" rel="noopener noreferrer" className="block">
        {video.thumbnailImage && (
          <div className="relative mb-5 aspect-video overflow-hidden rounded-[1.4rem] bg-border-color">
            <Image
              src={video.thumbnailImage}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(36,28,24,0.2)] transition-all group-hover:bg-[rgba(36,28,24,0.3)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,248,240,0.92)] transition-transform group-hover:scale-110">
                <svg 
                  className="w-8 h-8 text-text-primary ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold transition-colors group-hover:text-accent md:text-2xl">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="mb-4 line-clamp-2 text-sm leading-7 text-text-secondary">
            {video.description}
          </p>
        )}
        
        <div className="flex items-center gap-3 border-t border-border-color pt-4 text-sm text-text-secondary">
          {video.duration && <span>{video.duration}</span>}
          {video.duration && video.platform && <span>·</span>}
          {video.platform && <span>{video.platform}</span>}
        </div>
      </a>
    </article>
  );
}
