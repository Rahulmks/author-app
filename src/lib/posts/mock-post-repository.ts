import { mockPosts } from '@/data/posts';
import type { Post, PostSummary } from '@/types/post';

import type { PostRepository } from '@/lib/posts/post-repository';

export class MockPostRepository implements PostRepository {
  async getPublishedPosts(): Promise<PostSummary[]> {
    return mockPosts
      .filter((post) => post.status === 'published' || post.published !== false)
      .map(({ id, title, slug, excerpt, coverImage, category, tags, publishedAt, readingTimeMinutes, featured }) => ({
        id,
        title,
        slug,
        excerpt,
        coverImage,
        category,
        tags,
        publishedAt,
        readingTimeMinutes,
        featured: Boolean(featured),
      }));
  }

  async getPublishedPostBySlug(slug: string): Promise<Post | null> {
    return mockPosts.find((post) => post.slug === slug && (post.status === 'published' || post.published !== false)) ?? null;
  }

  async getDrafts(): Promise<PostSummary[]> {
    return mockPosts
      .filter((post) => post.status === 'draft')
      .map(({ id, title, slug, excerpt, coverImage, category, tags, publishedAt, readingTimeMinutes, featured }) => ({
        id,
        title,
        slug,
        excerpt,
        coverImage,
        category,
        tags,
        publishedAt,
        readingTimeMinutes,
        featured: Boolean(featured),
      }));
  }

  async getPostById(id: string): Promise<Post | null> {
    return mockPosts.find((post) => post.id === id) ?? null;
  }

  async createPost(post: Post): Promise<void> {
    mockPosts.push(post);
  }

  async updatePost(post: Post): Promise<void> {
    const index = mockPosts.findIndex((item) => item.id === post.id);
    if (index >= 0) {
      mockPosts[index] = post;
    }
  }

  async deletePost(id: string): Promise<void> {
    const index = mockPosts.findIndex((post) => post.id === id);
    if (index >= 0) {
      mockPosts.splice(index, 1);
    }
  }
}
