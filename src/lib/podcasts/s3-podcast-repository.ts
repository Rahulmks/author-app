import 'server-only';

import type { PodcastEpisode } from '@/types/podcast';
import { getJsonObject } from '@/lib/aws/s3-read';

import type { PodcastRepository } from '@/lib/podcasts/podcast-repository';

const PODCASTS_INDEX_KEY = 'podcasts/index.json';

export class S3PodcastRepository implements PodcastRepository {
  async getEpisodes(): Promise<PodcastEpisode[]> {
    const episodes = await getJsonObject<PodcastEpisode[]>(PODCASTS_INDEX_KEY);
    return episodes ?? [];
  }
}
