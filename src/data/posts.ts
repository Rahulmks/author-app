import { Post } from '@/types/post';

export const mockPosts: Post[] = [];

export const getFeaturedPost = (): Post | undefined => {
  return mockPosts.find((post) => post.featured);
};

export const getLatestPosts = (count: number = 3): Post[] => {
  return mockPosts
    .filter((post) => post.published)
    .sort((first, second) => {
      const firstDate = first.publishedAt ? new Date(first.publishedAt).getTime() : 0;
      const secondDate = second.publishedAt ? new Date(second.publishedAt).getTime() : 0;
      return secondDate - firstDate;
    })
    .slice(0, count);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return mockPosts.find((post) => post.slug === slug);
};
