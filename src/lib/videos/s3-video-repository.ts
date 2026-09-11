import 'server-only';

import type { Video } from '@/types/video';
import { getJsonObject } from '@/lib/aws/s3-read';

import type { VideoRepository } from '@/lib/videos/video-repository';

const VIDEOS_INDEX_KEY = 'videos/index.json';

export class S3VideoRepository implements VideoRepository {
  async getVideos(): Promise<Video[]> {
    const videos = await getJsonObject<Video[]>(VIDEOS_INDEX_KEY);
    return videos ?? [];
  }
}
