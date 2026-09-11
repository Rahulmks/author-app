import { mockVideos } from '@/data/videos';
import type { Video } from '@/types/video';

import type { VideoRepository } from '@/lib/videos/video-repository';

export class MockVideoRepository implements VideoRepository {
  async getVideos(): Promise<Video[]> {
    return mockVideos;
  }
}
