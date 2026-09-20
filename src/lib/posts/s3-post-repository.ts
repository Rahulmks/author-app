import 'server-only';

import { ListObjectsV2Command } from '@aws-sdk/client-s3';

import type { Post, PostSummary } from '@/types/post';
import { getS3Client, isS3Configured } from '@/lib/aws/s3-client';
import { getJsonObject } from '@/lib/aws/s3-read';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

import type { PostRepository } from '@/lib/posts/post-repository';

const POSTS_INDEX_KEY = 'posts/index.json';
const DRAFTS_INDEX_KEY = 'posts/drafts/index.json';

export class S3PostRepository implements PostRepository {
  async getPublishedPosts(): Promise<PostSummary[]> {
    const posts = await this.readPublishedPostsFromStorage();
    await this.syncIndex(posts);
    return posts;
  }

  async getPublishedPostBySlug(slug: string): Promise<Post | null> {
    const post = await getJsonObject<Post>(`posts/published/${slug}.json`);
    if (!post) {
      return null;
    }

    return {
      ...post,
      coverImage: resolveImagePath(post.coverImage),
    };
  }

  async getDrafts(): Promise<PostSummary[]> {
    const drafts = await this.readDraftsFromStorage();
    await this.syncDraftsIndex(drafts);
    return drafts;
  }

  async getPostById(id: string): Promise<Post | null> {
    const draft = await getJsonObject<Post>(`posts/drafts/${id}.json`);
    if (draft) {
      return draft;
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
      const drafts = await this.readDraftsFromStorage();
      await this.syncDraftsIndex(drafts);
      return;
    }

    await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject(`posts/published/${post.slug}.json`, post));
    const publishedPosts = await this.readPublishedPostsFromStorage();
    await this.syncIndex(publishedPosts);
  }

  async updatePost(post: Post): Promise<void> {
    const key = post.status === 'draft' ? `posts/drafts/${post.id}.json` : `posts/published/${post.slug}.json`;
    await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject(key, post));

    if (post.status === 'published') {
      const publishedPosts = await this.readPublishedPostsFromStorage();
      await this.syncIndex(publishedPosts);
      return;
    }

    const drafts = await this.readDraftsFromStorage();
    await this.syncDraftsIndex(drafts);
  }

  async deletePost(id: string): Promise<void> {
    await import('@/lib/aws/s3-write').then(({ deleteObject }) => deleteObject(`posts/drafts/${id}.json`));
    const drafts = await this.readDraftsFromStorage();
    await this.syncDraftsIndex(drafts);

    const publishedPost = await this.getPublishedPosts();
    const match = publishedPost.find((post) => post.id === id);
    if (match) {
      await import('@/lib/aws/s3-write').then(({ deleteObject }) => deleteObject(`posts/published/${match.slug}.json`));
      const refreshed = await this.readPublishedPostsFromStorage();
      await this.syncIndex(refreshed);
    }
  }

  private async readPublishedPostsFromStorage(): Promise<PostSummary[]> {
    const keys = await this.listObjectKeys('posts/published/');
    const posts: PostSummary[] = [];

    for (const key of keys) {
      if (key === POSTS_INDEX_KEY || key === DRAFTS_INDEX_KEY) {
        continue;
      }

      const post = await getJsonObject<Post>(key);
      if (!post || typeof post !== 'object' || Array.isArray(post)) {
        continue;
      }

      posts.push({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: resolveImagePath(post.coverImage),
        category: post.category,
        tags: post.tags ?? [],
        publishedAt: post.publishedAt,
        readingTimeMinutes: post.readingTimeMinutes,
        featured: Boolean(post.featured),
      });
    }

    return posts;
  }

  private async readDraftsFromStorage(): Promise<PostSummary[]> {
    const keys = await this.listObjectKeys('posts/drafts/');
    const drafts: PostSummary[] = [];

    for (const key of keys) {
      if (key === DRAFTS_INDEX_KEY || key === POSTS_INDEX_KEY) {
        continue;
      }

      const post = await getJsonObject<Post>(key);
      if (!post || typeof post !== 'object' || Array.isArray(post)) {
        continue;
      }

      drafts.push({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: resolveImagePath(post.coverImage),
        category: post.category,
        tags: post.tags ?? [],
        publishedAt: post.publishedAt,
        readingTimeMinutes: post.readingTimeMinutes,
        featured: Boolean(post.featured),
      });
    }

    return drafts;
  }

  private async listObjectKeys(prefix: string): Promise<string[]> {
    if (!isS3Configured()) {
      return [];
    }

    const client = getS3Client();
    const bucket = process.env.S3_BUCKET_NAME;

    if (!client || !bucket) {
      return [];
    }

    const keys: string[] = [];
    let continuationToken: string | undefined;

    do {
      const response = await client.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        }),
      );

      for (const item of response.Contents ?? []) {
        if (item.Key && item.Key.endsWith('.json') && item.Key !== POSTS_INDEX_KEY && item.Key !== DRAFTS_INDEX_KEY) {
          keys.push(item.Key);
        }
      }

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } while (continuationToken);

    return keys;
  }

  private async syncIndex(posts: PostSummary[] = []): Promise<void> {
    const validPosts = posts.filter(Boolean) as PostSummary[];
    await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject(POSTS_INDEX_KEY, validPosts));
  }

  private async syncDraftsIndex(drafts: PostSummary[] = []): Promise<void> {
    const validDrafts = drafts.filter(Boolean) as PostSummary[];
    await import('@/lib/aws/s3-write').then(({ putJsonObject }) => putJsonObject(DRAFTS_INDEX_KEY, validDrafts));
  }
}
