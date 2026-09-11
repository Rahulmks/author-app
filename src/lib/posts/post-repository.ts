import type { Post, PostSummary } from '@/types/post';

export interface PostRepository {
  getPublishedPosts(): Promise<PostSummary[]>;
  getPublishedPostBySlug(slug: string): Promise<Post | null>;
  getDrafts(): Promise<PostSummary[]>;
  getPostById(id: string): Promise<Post | null>;
  createPost(post: Post): Promise<void>;
  updatePost(post: Post): Promise<void>;
  deletePost(id: string): Promise<void>;
}
