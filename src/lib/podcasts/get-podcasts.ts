import { podcastRepository } from '@/lib/repositories';

export async function getPodcasts() {
  return podcastRepository.getEpisodes();
}
