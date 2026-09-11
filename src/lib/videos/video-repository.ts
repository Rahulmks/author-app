import type { Video } from '@/types/video';

export interface VideoRepository {
  getVideos(): Promise<Video[]>;
}
