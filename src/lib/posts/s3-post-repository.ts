import 'server-only';

import type { Post, PostSummary } from '@/types/post';
import { getJsonObject } from '@/lib/aws/s3-read';

import type { PostRepository } from '@/lib/posts/post-repository';

const POSTS_INDEX_KEY = 'posts/index.json';

export class S3PostRepository implements PostRepository {
  async getPublishedPosts(): Promise<PostSummary[]> {
    const index = await getJsonObject<PostSummary[]>(POSTS_INDEX_KEY);
    return index ?? [];
  }

  async getPublishedPostBySlug(slug: string): Promise<Post | null> {
    const post = await getJsonObject<Post>(`posts/published/${slug}.json`);
    if (!post) {
      return null;
    }
    return post;
  }

  async getDrafts(): Promise<PostSummary[]> {
    const drafts = await getJsonObject<PostSummary[]>('posts/drafts/index.json');
    return drafts ?? [];
  }

  async getPostById(id: string): Promise<Post | null> {
    const post = await getJsonObject<Post>(`posts/drafts/${id}.json`);
    if (post) {
      return post;
    }

    const publishedPosts = await this.getPublishedPosts();
    const publishedPost = publishedPosts.find((item) => item.id === id);
    if (!publishedPost) {
      return null;
    }

    return this.getPublishedPostBySlug(publishedPost.slug);
  }

  async createPost(post: Post): Promise<void> {
    if (post.status === 'draft') {
      await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject(`posts/drafts/${post.id}.json`, post));
      return;
    }

    await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject(`posts/published/${post.slug}.json`, post));
    await this.syncIndex();
  }

  async updatePost(post: Post): Promise<void> {
    const key = post.status === 'draft' ? `posts/drafts/${post.id}.json` : `posts/published/${post.slug}.json`;
    await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject(key, post));

    if (post.status === 'published') {
      await this.syncIndex();
    }
  }

  async deletePost(id: string): Promise<void> {
    await import('@/lib/aws/s3-write').then(({ deleteObject }) => deleteObject(`posts/drafts/${id}.json`));
    const publishedPost = await this.getPublishedPosts();
    const match = publishedPost.find((post) => post.id === id);
    if (match) {
      await import('@/lib/aws/s3-write').then(({ deleteObject }) => deleteObject(`posts/published/${match.slug}.json`));
    }
  }

  private async syncIndex(): Promise<void> {
    const posts = await this.getPublishedPosts();
    const validPosts = posts.filter(Boolean) as PostSummary[];
    await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject('posts/index.json', validPosts));
  }
}
