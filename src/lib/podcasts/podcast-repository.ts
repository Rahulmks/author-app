import type { PodcastEpisode } from '@/types/podcast';

export interface PodcastRepository {
  getEpisodes(): Promise<PodcastEpisode[]>;
}
