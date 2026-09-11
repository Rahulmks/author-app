import 'server-only';

import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

import { getS3Client, isS3Configured } from '@/lib/aws/s3-client';

export async function putJsonObject<T>(key: string, value: T): Promise<void> {
  if (!isS3Configured()) {
    throw new Error('S3 storage is not configured.');
  }

  const client = getS3Client();
  const bucket = process.env.S3_BUCKET_NAME;

  if (!client || !bucket) {
    throw new Error('S3 bucket configuration is incomplete.');
  }

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: 'application/json',
        Body: JSON.stringify(value, null, 2),
      }),
    );
  } catch (error) {
    console.error(`Unable to write S3 object: ${key}`, error);
    throw new Error(`Unable to save content to S3 for ${key}.`);
  }
}

export async function writeToS3<T>(key: string, value: T): Promise<void> {
  await putJsonObject(key, value);
}

export async function deleteObject(key: string): Promise<void> {
  if (!isS3Configured()) {
    throw new Error('S3 storage is not configured.');
  }

  const client = getS3Client();
  const bucket = process.env.S3_BUCKET_NAME;

  if (!client || !bucket) {
    throw new Error('S3 bucket configuration is incomplete.');
  }

  try {
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  } catch (error) {
    console.error(`Unable to delete S3 object: ${key}`, error);
    throw new Error(`Unable to delete content from S3 for ${key}.`);
  }
}
