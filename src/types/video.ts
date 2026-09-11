export type VideoPlatform = 'youtube' | 'vimeo' | 'other';

export interface Video {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  platform: VideoPlatform;
  videoUrl: string;
  url?: string;
  thumbnail?: string;
  thumbnailImage?: string;
  thumbnailUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  duration?: string;
  provider?: VideoPlatform;
}
