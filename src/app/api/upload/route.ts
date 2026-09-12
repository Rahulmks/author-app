import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { createUploadUrl } from '@/lib/aws/presigned-url';
import { getS3Client, isS3Configured } from '@/lib/aws/s3-client';
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

function buildPublicUrl(objectKey: string) {
  const bucket = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;

  if (!bucket || !region) {
    return undefined;
  }

  const encodedKey = objectKey
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
}

export async function POST(request: Request) {
  await requireAdminSession();

  const contentTypeHeader = request.headers.get('content-type') ?? '';

  if (contentTypeHeader.includes('multipart/form-data')) {
    if (!isS3Configured()) {
      return NextResponse.json({ error: 'S3 storage is not configured.' }, { status: 500 });
    }

    const client = getS3Client();
    const bucket = process.env.S3_BUCKET_NAME;

    if (!client || !bucket) {
      return NextResponse.json({ error: 'S3 bucket configuration is incomplete.' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const requestedFolder = formData.get('folder');
    const folder =
      typeof requestedFolder === 'string' && requestedFolder in folderPrefixMap
        ? (requestedFolder as UploadFolder)
        : 'general';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 });
    }

    const objectKey = `${folderPrefixMap[folder]}/${Date.now()}-${crypto.randomUUID()}${extractExtension(file.name)}`;

    try {
      const body = Buffer.from(await file.arrayBuffer());
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: objectKey,
          Body: body,
          ContentType: file.type || 'application/octet-stream',
        }),
      );

      const publicUrl = buildPublicUrl(objectKey);

      return NextResponse.json({ objectKey, publicUrl });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to upload file.';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

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

    const publicUrl = buildPublicUrl(objectKey);

    return NextResponse.json({ uploadUrl, objectKey, publicUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create upload URL.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
