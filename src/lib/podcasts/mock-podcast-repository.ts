import { mockPodcasts } from '@/data/podcasts';
import type { PodcastEpisode } from '@/types/podcast';

import type { PodcastRepository } from '@/lib/podcasts/podcast-repository';

export class MockPodcastRepository implements PodcastRepository {
  async getEpisodes(): Promise<PodcastEpisode[]> {
    return mockPodcasts;
  }
}
