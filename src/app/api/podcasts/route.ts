import { NextResponse } from 'next/server';
import { mockPodcasts } from '@/data/podcasts';
import { getJsonObject } from '@/lib/aws/s3-read';
import { isS3Configured } from '@/lib/aws/s3-client';
import { putJsonObject } from '@/lib/aws/s3-write';
import { requireAdminSession } from '@/lib/auth/auth';
import { revalidatePodcasts } from '@/lib/cache/revalidate';
import { podcastRepository } from '@/lib/repositories';
import type { PodcastEpisode, PodcastPlatform } from '@/types/podcast';

const PODCASTS_INDEX_KEY = 'podcasts/index.json';

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

function normalizePlatform(value: unknown): PodcastPlatform {
  return value === 'apple' || value === 'youtube' || value === 'other' ? value : 'spotify';
}

function normalizeEpisode(input: Record<string, unknown>, existing?: PodcastEpisode): PodcastEpisode {
  const now = new Date().toISOString();
  const title = toOptionalString(input.title);
  const episodeUrl = toOptionalString(input.episodeUrl);

  if (!title) {
    throw new Error('Title is required.');
  }

  if (!episodeUrl) {
    throw new Error('Episode URL is required.');
  }

  const episodeNumber =
    typeof input.episodeNumber === 'number'
      ? input.episodeNumber
      : typeof input.episodeNumber === 'string' && input.episodeNumber.trim()
        ? Number(input.episodeNumber)
        : undefined;

  return {
    id: existing?.id ?? `podcast-${Date.now()}`,
    title,
    slug: toOptionalString(input.slug) ?? toSlug(title),
    description: toOptionalString(input.description),
    platform: normalizePlatform(input.platform),
    episodeUrl,
    coverImage: toOptionalString(input.coverImage),
    image: toOptionalString(input.coverImage),
    episodeNumber: Number.isFinite(episodeNumber) ? episodeNumber : undefined,
    duration: toOptionalString(input.duration),
    publishedAt: toOptionalString(input.publishedAt),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    source: existing?.source,
  };
}

async function loadEpisodesForWrite() {
  if (isS3Configured()) {
    return (await getJsonObject<PodcastEpisode[]>(PODCASTS_INDEX_KEY)) ?? [];
  }

  return mockPodcasts;
}

async function persistEpisodes(episodes: PodcastEpisode[]) {
  if (isS3Configured()) {
    await putJsonObject(PODCASTS_INDEX_KEY, episodes);
    return;
  }

  mockPodcasts.splice(0, mockPodcasts.length, ...episodes);
}

export async function GET(request: Request) {
  await requireAdminSession();

  const podcasts = await podcastRepository.getEpisodes();
  return NextResponse.json({ podcasts });
}

export async function POST(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const episodes = await loadEpisodesForWrite();
    const episode = normalizeEpisode(body);
    episodes.push(episode);
    await persistEpisodes(episodes);
    revalidatePodcasts();
    return NextResponse.json({ episode }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create podcast entry.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const id = typeof body?.id === 'string' ? body.id : undefined;

  if (!body || !id) {
    return NextResponse.json({ error: 'Podcast id is required.' }, { status: 400 });
  }

  const episodes = await loadEpisodesForWrite();
  const index = episodes.findIndex((episode) => episode.id === id);

  if (index < 0) {
    return NextResponse.json({ error: 'Podcast not found.' }, { status: 404 });
  }

  try {
    const updated = normalizeEpisode(body, episodes[index]);
    episodes[index] = updated;
    await persistEpisodes(episodes);
    revalidatePodcasts();
    return NextResponse.json({ episode: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update podcast entry.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id) {
    return NextResponse.json({ error: 'Podcast id is required.' }, { status: 400 });
  }

  const episodes = await loadEpisodesForWrite();
  const nextEpisodes = episodes.filter((episode) => episode.id !== id);

  if (nextEpisodes.length === episodes.length) {
    return NextResponse.json({ error: 'Podcast not found.' }, { status: 404 });
  }

  await persistEpisodes(nextEpisodes);
  revalidatePodcasts();
  return NextResponse.json({ success: true });
}
