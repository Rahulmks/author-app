import 'server-only';

import { S3Client } from '@aws-sdk/client-s3';

export function isS3Configured() {
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
  return Boolean(region && process.env.S3_BUCKET_NAME);
}

export function getS3Client(): S3Client | null {
  if (!isS3Configured()) {
    return null;
  }

  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const clientConfig: {
    region: string;
    credentials?: {
      accessKeyId: string;
      secretAccessKey: string;
    };
  } = { region };

  if (accessKeyId && secretAccessKey) {
    clientConfig.credentials = { accessKeyId, secretAccessKey };
  }

  return new S3Client(clientConfig);
}

export const s3Client = getS3Client();
