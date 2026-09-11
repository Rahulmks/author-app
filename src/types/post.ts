export type PostStatus = 'draft' | 'published';
export type PostContentFormat = 'html';

export interface PostSEO {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentFormat: PostContentFormat;
  coverImage?: string;
  author: string;
  status: PostStatus;
  category?: string;
  tags: string[];
  readingTimeMinutes?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  seo?: PostSEO;
  featured?: boolean;
  published?: boolean;
  source?: 'mock' | 's3';
}

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  tags: string[];
  publishedAt?: string;
  readingTimeMinutes?: number;
}
