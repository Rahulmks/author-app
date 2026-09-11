import { postRepository } from '@/lib/repositories';

export async function getPosts() {
  return postRepository.getPublishedPosts();
}
