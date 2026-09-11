interface PostMetadataProps {
  author?: string;
  publishedAt: string;
  readingTime?: number;
  className?: string;
}

import { formatTamilDate, formatTamilReadingTime } from '@/lib/navigation';

export default function PostMetadata({ 
  author = 'எழுத்தாளர்',
  publishedAt, 
  readingTime,
  className = ''
}: PostMetadataProps) {
  return (
    <div className={`flex items-center gap-3 text-sm text-text-secondary ${className}`}>
      <span>{author}</span>
      <span>·</span>
      <time dateTime={publishedAt}>
        {formatTamilDate(publishedAt, 'long')}
      </time>
      {readingTime && (
        <>
          <span>·</span>
          <span>{formatTamilReadingTime(readingTime)}</span>
        </>
      )}
    </div>
  );
}
