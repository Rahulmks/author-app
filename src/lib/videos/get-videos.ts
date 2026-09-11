import { videoRepository } from '@/lib/repositories';

export async function getVideos() {
  return videoRepository.getVideos();
}
