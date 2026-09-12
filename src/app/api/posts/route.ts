import { NextResponse } from 'next/server';
import { isS3Configured } from '@/lib/aws/s3-client';
import { deleteObject } from '@/lib/aws/s3-write';
import { requireAdminSession } from '@/lib/auth/auth';
import { revalidatePost, revalidatePosts } from '@/lib/cache/revalidate';
import { postRepository } from '@/lib/repositories';
import type { Post } from '@/types/post';

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toTags(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof input === 'string') {
    return input
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function toOptionalString(input: unknown) {
  if (typeof input !== 'string') {
    return undefined;
  }

  const trimmed = input.trim();
  return trimmed ? trimmed : undefined;
}

function toOptionalNumber(input: unknown) {
  if (typeof input === 'number' && Number.isFinite(input)) {
    return input;
  }

  if (typeof input === 'string' && input.trim()) {
    const value = Number(input);
    if (Number.isFinite(value)) {
      return value;
    }
  }

  return undefined;
}

function normalizePost(input: Record<string, unknown>, existing?: Post): Post {
  const now = new Date().toISOString();
  const title = toOptionalString(input.title);

  if (!title) {
    throw new Error('Title is required.');
  }

  const excerpt = toOptionalString(input.excerpt);
  if (!excerpt) {
    throw new Error('Excerpt is required.');
  }

  const content = toOptionalString(input.content);
  if (!content) {
    throw new Error('Content is required.');
  }

  const status = input.status === 'published' ? 'published' : 'draft';
  const slugInput = toOptionalString(input.slug);
  const slug = toSlug(slugInput || title);

  if (!slug) {
    throw new Error('Unable to generate a valid slug for this post.');
  }

  const publishedAtInput = toOptionalString(input.publishedAt);
  const publishedAt = status === 'published'
    ? publishedAtInput || existing?.publishedAt || now
    : undefined;

  return {
    id: existing?.id ?? toOptionalString(input.id) ?? `post-${Date.now()}`,
    title,
    slug,
    excerpt,
    content,
    contentFormat: 'html',
    coverImage: toOptionalString(input.coverImage),
    author: toOptionalString(input.author) ?? existing?.author ?? 'எழுத்தாளர்',
    status,
    category: toOptionalString(input.category),
    tags: toTags(input.tags),
    readingTimeMinutes: toOptionalNumber(input.readingTimeMinutes),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    publishedAt,
    featured: Boolean(input.featured ?? existing?.featured),
    published: status === 'published',
    seo: {
      title: toOptionalString(input.seoTitle) ?? existing?.seo?.title ?? title,
      description: toOptionalString(input.seoDescription) ?? existing?.seo?.description ?? excerpt,
      canonicalUrl: `/posts/${slug}`,
    },
    source: existing?.source,
  };
}

export async function GET(request: Request) {
  await requireAdminSession();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const id = searchParams.get('id');

  if (id) {
    const post = await postRepository.getPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    return NextResponse.json({ post });
  }

  const published = await postRepository.getPublishedPosts();
  const drafts = await postRepository.getDrafts();

  if (status === 'published') {
    return NextResponse.json({ posts: published.map((item) => ({ ...item, status: 'published' })) });
  }

  if (status === 'draft') {
    return NextResponse.json({ posts: drafts.map((item) => ({ ...item, status: 'draft' })) });
  }

  const combinedById = new Map<string, Record<string, unknown>>();
  published.forEach((item) => combinedById.set(item.id, { ...item, status: 'published' }));
  drafts.forEach((item) => combinedById.set(item.id, { ...item, status: 'draft' }));

  return NextResponse.json({
    posts: Array.from(combinedById.values()),
  });
}

export async function POST(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const post = normalizePost(body);
    await postRepository.createPost(post);
    revalidatePosts();
    if (post.status === 'published') {
      revalidatePost(post.slug);
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create post.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const id = body?.id;

  if (!body || typeof id !== 'string' || !id.trim()) {
    return NextResponse.json({ error: 'Post id is required.' }, { status: 400 });
  }

  const existing = await postRepository.getPostById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  try {
    const updatedPost = normalizePost(body, existing);
    await postRepository.updatePost(updatedPost);

    if (isS3Configured() && existing.status === 'published' && existing.slug !== updatedPost.slug) {
      await deleteObject(`posts/published/${existing.slug}.json`).catch(() => null);
    }

    revalidatePosts();
    revalidatePost(existing.slug);
    if (updatedPost.status === 'published') {
      revalidatePost(updatedPost.slug);
    }

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update post.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id) {
    return NextResponse.json({ error: 'Post id is required.' }, { status: 400 });
  }

  const existing = await postRepository.getPostById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  await postRepository.deletePost(id);
  revalidatePosts();
  if (existing.slug) {
    revalidatePost(existing.slug);
  }

  return NextResponse.json({ success: true });
}
