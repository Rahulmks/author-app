import { isS3Configured } from '@/lib/aws/s3-client';
import { MockEventRepository } from '@/lib/events/mock-event-repository';
import { S3EventRepository } from '@/lib/events/s3-event-repository';
import { MockBookRepository } from '@/lib/books/mock-book-repository';
import { S3BookRepository } from '@/lib/books/s3-book-repository';
import { MockPodcastRepository } from '@/lib/podcasts/mock-podcast-repository';
import { S3PodcastRepository } from '@/lib/podcasts/s3-podcast-repository';
import { MockPostRepository } from '@/lib/posts/mock-post-repository';
import { S3PostRepository } from '@/lib/posts/s3-post-repository';
import { MockVideoRepository } from '@/lib/videos/mock-video-repository';
import { S3VideoRepository } from '@/lib/videos/s3-video-repository';

export const postRepository = isS3Configured()
  ? new S3PostRepository()
  : new MockPostRepository();

export const bookRepository = isS3Configured()
  ? new S3BookRepository()
  : new MockBookRepository();

export const videoRepository = isS3Configured()
  ? new S3VideoRepository()
  : new MockVideoRepository();

export const podcastRepository = isS3Configured()
  ? new S3PodcastRepository()
  : new MockPodcastRepository();

export const eventRepository = isS3Configured()
  ? new S3EventRepository()
  : new MockEventRepository();
