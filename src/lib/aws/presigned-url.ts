import 'server-only';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getS3Client, isS3Configured } from '@/lib/aws/s3-client';

const allowedPrefixes = [
  'media/posts/',
  'media/books/',
  'media/podcasts/',
  'media/videos/',
  'media/author/',
  'media/profile/',
  'media/general/',
];

export async function createUploadUrl(options?: {
  prefix?: string;
  extension?: string;
  contentType?: string;
}): Promise<{ uploadUrl: string; objectKey: string }> {
  if (!isS3Configured()) {
    throw new Error('S3 storage is not configured.');
  }

  const bucket = process.env.S3_BUCKET_NAME;
  const client = getS3Client();

  if (!bucket || !client) {
    throw new Error('S3 bucket configuration is incomplete.');
  }

  const prefix = options?.prefix ? options.prefix.replace(/^\/+|\/+$/g, '') : 'media/general';
  const normalizedPrefix = `${prefix.replace(/\/+/g, '/')}/`;

  if (!allowedPrefixes.some((allowed) => normalizedPrefix.startsWith(allowed))) {
    throw new Error('Upload prefix is not allowed for this environment.');
  }

  const extension = options?.extension
    ? options.extension.startsWith('.')
      ? options.extension
      : `.${options.extension}`
    : '';
  const objectKey = `${normalizedPrefix}${Date.now()}-${crypto.randomUUID()}${extension}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: objectKey,
    ContentType: options?.contentType ?? 'application/octet-stream',
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 60 });

  return { uploadUrl, objectKey };
}

export async function generatePresignedUploadUrl(key: string) {
  return createUploadUrl({ prefix: key });
}
