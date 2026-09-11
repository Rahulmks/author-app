export type PodcastPlatform = 'spotify' | 'apple' | 'youtube' | 'other';

export interface PodcastEpisode {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  platform: PodcastPlatform;
  episodeUrl: string;
  image?: string;
  coverImage?: string;
  episodeNumber?: number;
  duration?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  platforms?: Record<string, string | undefined>;
  source?: 'mock' | 's3';
}

export type Podcast = PodcastEpisode;
