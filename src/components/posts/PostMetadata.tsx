interface PostMetadataProps {
  author?: string;
  publishedAt: string;
  readingTime?: number;
  className?: string;
}

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/lib/navigation';

export default function PostMetadata({ 
  author,
  publishedAt, 
  readingTime,
  className = ''
}: PostMetadataProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  return (
    <div className={`flex items-center gap-3 text-sm text-text-secondary ${className}`}>
      <span>{author ?? t('defaultAuthor')}</span>
      <span>·</span>
      <time dateTime={publishedAt}>
        {formatDate(publishedAt, locale, 'long')}
      </time>
      {readingTime && (
        <>
          <span>·</span>
          <span>{t('readingTime', { minutes: readingTime })}</span>
        </>
      )}
    </div>
  );
}
