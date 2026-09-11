import { revalidatePath, revalidateTag } from 'next/cache';

export function revalidatePosts() {
  revalidateTag('posts');
  revalidatePath('/posts');
}

export function revalidatePost(slug: string) {
  revalidateTag(`post:${slug}`);
  revalidateTag('posts');
  revalidatePath(`/posts/${slug}`);
}

export function revalidateBooks() {
  revalidateTag('books');
  revalidatePath('/books');
}

export function revalidateVideos() {
  revalidateTag('videos');
  revalidatePath('/videos');
}

export function revalidatePodcasts() {
  revalidateTag('podcasts');
  revalidatePath('/podcast');
}

export function revalidatePages() {
  revalidateTag('pages');
  revalidatePath('/about');
}
