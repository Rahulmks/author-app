import 'server-only';

import { GetObjectCommand } from '@aws-sdk/client-s3';

import { getS3Client, isS3Configured } from '@/lib/aws/s3-client';

export async function getJsonObject<T>(key: string): Promise<T | null> {
  if (!isS3Configured()) {
    return null;
  }

  const client = getS3Client();
  const bucket = process.env.S3_BUCKET_NAME;

  if (!client || !bucket) {
    throw new Error('S3 bucket configuration is incomplete.');
  }

  try {
    const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const body = response.Body;

    if (!body) {
      return null;
    }

    const json = await body.transformToString();
    return JSON.parse(json) as T;
  } catch (error) {
    const err = error as { name?: string; code?: string; message?: string };
    const isMissingObject =
      err?.name === 'NoSuchKey' ||
      err?.code === 'NoSuchKey' ||
      err?.name === 'NotFound' ||
      err?.code === 'NotFound';

    if (isMissingObject) {
      return null;
    }

    console.error(`Unable to read S3 object: ${key}`, err);
    throw new Error(`Unable to load content from S3 for ${key}.`);
  }
}

export async function readFromS3<T>(key: string): Promise<T | null> {
  return getJsonObject<T>(key);
}
