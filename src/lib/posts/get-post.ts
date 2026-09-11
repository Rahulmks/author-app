import { postRepository } from '@/lib/repositories';

export async function getPost(slug: string) {
  return postRepository.getPublishedPostBySlug(slug);
}
