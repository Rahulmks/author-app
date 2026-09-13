import { NextResponse } from 'next/server';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { getS3Object } from '@/lib/aws/s3-read';

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.avif':
      return 'image/avif';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(
  request: Request,
  { params }: { params: { key?: string[] } }
) {
  const keySegments = params?.key ?? [];
  if (keySegments.length === 0) {
    return new NextResponse('Key is required', { status: 400 });
  }

  const rawKey = keySegments.join('/');
  const s3Key = rawKey.startsWith('media/') ? rawKey : `media/${rawKey}`;
  const localRelativePath = rawKey.startsWith('media/') ? rawKey.slice('media/'.length) : rawKey;

  // 1. Try fetching primary S3 key (e.g. media/books/aram.jpg)
  const s3Result = await getS3Object(s3Key);
  if (s3Result) {
    const contentType = s3Result.contentType || getMimeType(s3Key);
    return new NextResponse(Buffer.from(s3Result.body), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // 2. Try raw key if different
  if (s3Key !== rawKey) {
    const s3RawResult = await getS3Object(rawKey);
    if (s3RawResult) {
      const contentType = s3RawResult.contentType || getMimeType(rawKey);
      return new NextResponse(Buffer.from(s3RawResult.body), {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  // 3. Fallback to local file in public/images/
  try {
    const publicPath = path.join(process.cwd(), 'public', 'images', localRelativePath);
    const fileBuffer = await readFile(publicPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': getMimeType(localRelativePath),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    // Try raw key locally if different
    if (localRelativePath !== rawKey) {
      try {
        const publicPath = path.join(process.cwd(), 'public', 'images', rawKey);
        const fileBuffer = await readFile(publicPath);
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': getMimeType(rawKey),
            'Cache-Control': 'public, max-age=86400',
          },
        });
      } catch {
        // Not found
      }
    }
  }

  return new NextResponse('Image not found', { status: 404 });
}
