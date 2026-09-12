import { NextResponse } from 'next/server';
import { createUploadUrl } from '@/lib/aws/presigned-url';
import { requireAdminSession } from '@/lib/auth/auth';

type UploadFolder = 'posts' | 'books' | 'podcasts' | 'videos' | 'author' | 'general';

const folderPrefixMap: Record<UploadFolder, string> = {
  posts: 'media/posts',
  books: 'media/books',
  podcasts: 'media/podcasts',
  videos: 'media/videos',
  author: 'media/author',
  general: 'media/general',
};

function extractExtension(filename?: string) {
  if (!filename) {
    return '';
  }

  const lastDot = filename.lastIndexOf('.');
  if (lastDot < 0 || lastDot === filename.length - 1) {
    return '';
  }

  return filename.slice(lastDot).toLowerCase();
}

export async function POST(request: Request) {
  await requireAdminSession();

  const body = (await request.json().catch(() => null)) as {
    filename?: string;
    contentType?: string;
    folder?: UploadFolder;
  } | null;

  const folder = body?.folder && body.folder in folderPrefixMap ? body.folder : 'general';

  try {
    const { uploadUrl, objectKey } = await createUploadUrl({
      prefix: folderPrefixMap[folder],
      extension: extractExtension(body?.filename),
      contentType: body?.contentType || 'application/octet-stream',
    });

    const publicUrl = objectKey.startsWith('media/')
      ? `/images/${objectKey.slice('media/'.length)}`
      : undefined;

    return NextResponse.json({ uploadUrl, objectKey, publicUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create upload URL.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
