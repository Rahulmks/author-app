import Image from 'next/image';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoLink = video.url ?? video.videoUrl;

  return (
    <article className="group border-t border-border-color py-6">
      <a href={videoLink} target="_blank" rel="noopener noreferrer" className="block">
        {video.thumbnailImage && (
          <div className="relative mb-6 aspect-video overflow-hidden bg-border-color">
            <Image
              src={video.thumbnailImage}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        {video.category && (
          <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-accent">
            {video.category}
          </p>
        )}

        <h3 className="mb-2 line-clamp-2 text-xl font-medium transition-colors group-hover:text-accent md:text-2xl">
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
