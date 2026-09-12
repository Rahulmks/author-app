import 'server-only';

import type { Video } from '@/types/video';
import { getJsonObject } from '@/lib/aws/s3-read';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

import type { VideoRepository } from '@/lib/videos/video-repository';

const VIDEOS_INDEX_KEY = 'videos/index.json';

export class S3VideoRepository implements VideoRepository {
  async getVideos(): Promise<Video[]> {
    const videos = await getJsonObject<Video[]>(VIDEOS_INDEX_KEY);
    return (videos ?? []).map((video) => {
      const resolvedThumbnail = resolveImagePath(video.thumbnailImage ?? video.thumbnailUrl ?? video.thumbnail);
      const resolvedVideoUrl = video.videoUrl ?? video.url;

      return {
        ...video,
        videoUrl: resolvedVideoUrl,
        url: resolvedVideoUrl,
        thumbnailImage: resolvedThumbnail,
        thumbnail: resolvedThumbnail,
        thumbnailUrl: resolvedThumbnail,
      };
    });
  }
}
