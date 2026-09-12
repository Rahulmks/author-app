import { NextResponse } from 'next/server';
import { mockVideos } from '@/data/videos';
import { getJsonObject } from '@/lib/aws/s3-read';
import { isS3Configured } from '@/lib/aws/s3-client';
import { putJsonObject } from '@/lib/aws/s3-write';
import { requireAdminSession } from '@/lib/auth/auth';
import { revalidateVideos } from '@/lib/cache/revalidate';
import { videoRepository } from '@/lib/repositories';
import type { Video, VideoPlatform } from '@/types/video';

const VIDEOS_INDEX_KEY = 'videos/index.json';

function toOptionalString(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function normalizePlatform(value: unknown): VideoPlatform {
  return value === 'vimeo' || value === 'other' ? value : 'youtube';
}

function normalizeVideo(input: Record<string, unknown>, existing?: Video): Video {
  const now = new Date().toISOString();
  const title = toOptionalString(input.title);
  const videoUrl = toOptionalString(input.videoUrl);

  if (!title) {
    throw new Error('Title is required.');
  }

  if (!videoUrl) {
    throw new Error('Video URL is required.');
  }

  const thumbnail = toOptionalString(input.thumbnailUrl);

  return {
    id: existing?.id ?? `video-${Date.now()}`,
    title,
    slug: toOptionalString(input.slug) ?? toSlug(title),
    description: toOptionalString(input.description),
    platform: normalizePlatform(input.platform),
    videoUrl,
    url: videoUrl,
    thumbnail,
    thumbnailUrl: thumbnail,
    thumbnailImage: thumbnail,
    publishedAt: toOptionalString(input.publishedAt),
    duration: toOptionalString(input.duration),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    source: existing?.source,
  };
}

async function loadVideosForWrite() {
  if (isS3Configured()) {
    return (await getJsonObject<Video[]>(VIDEOS_INDEX_KEY)) ?? [];
  }

  return mockVideos;
}

async function persistVideos(videos: Video[]) {
  if (isS3Configured()) {
    await putJsonObject(VIDEOS_INDEX_KEY, videos);
    return;
  }

  mockVideos.splice(0, mockVideos.length, ...videos);
}

export async function GET(request: Request) {
  await requireAdminSession();

  const videos = await videoRepository.getVideos();
  return NextResponse.json({ videos });
}

export async function POST(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const videos = await loadVideosForWrite();
    const video = normalizeVideo(body);
    videos.push(video);
    await persistVideos(videos);
    revalidateVideos();
    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create video entry.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const id = typeof body?.id === 'string' ? body.id : undefined;

  if (!body || !id) {
    return NextResponse.json({ error: 'Video id is required.' }, { status: 400 });
  }

  const videos = await loadVideosForWrite();
  const index = videos.findIndex((video) => video.id === id);

  if (index < 0) {
    return NextResponse.json({ error: 'Video not found.' }, { status: 404 });
  }

  try {
    const updated = normalizeVideo(body, videos[index]);
    videos[index] = updated;
    await persistVideos(videos);
    revalidateVideos();
    return NextResponse.json({ video: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update video entry.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id) {
    return NextResponse.json({ error: 'Video id is required.' }, { status: 400 });
  }

  const videos = await loadVideosForWrite();
  const nextVideos = videos.filter((video) => video.id !== id);

  if (nextVideos.length === videos.length) {
    return NextResponse.json({ error: 'Video not found.' }, { status: 404 });
  }

  await persistVideos(nextVideos);
  revalidateVideos();
  return NextResponse.json({ success: true });
}
