import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

const bucket = process.env.S3_BUCKET_NAME || 'author-site-content-rahulmks-2026';
const region = process.env.AWS_REGION || 'us-east-1';

const imageDownloadDir = path.join(workspaceRoot, 'downloaded-s3-images');
const sampleDataDir = path.join(workspaceRoot, 's3-content-sample');
const publicImagesDir = path.join(workspaceRoot, 'public', 'images');
const imageExt = /\.(jpg|jpeg|png|webp|gif|svg)$/i;

const credentials = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
  ? {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  : undefined;

const s3 = new S3Client({ region, credentials });

async function listAllKeys() {
  let continuationToken;
  const keys = [];

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: continuationToken,
      }),
    );

    for (const item of response.Contents || []) {
      if (item.Key) {
        keys.push(item.Key);
      }
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
  } while (continuationToken);

  return keys;
}

async function downloadImages() {
  await mkdir(imageDownloadDir, { recursive: true });

  const keys = await listAllKeys();
  const imageKeys = keys.filter((key) => imageExt.test(key));

  for (const key of imageKeys) {
    const outPath = path.join(imageDownloadDir, key);
    await mkdir(path.dirname(outPath), { recursive: true });

    const response = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    if (!response.Body) {
      continue;
    }

    const bytes = await response.Body.transformToByteArray();
    await writeFile(outPath, Buffer.from(bytes));
    console.log(`Downloaded image: ${key}`);
  }

  console.log(`Image download complete. Total images: ${imageKeys.length}`);
}

async function walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function contentTypeFor(filePath) {
  if (filePath.endsWith('.json')) return 'application/json';
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.webp')) return 'image/webp';
  if (filePath.endsWith('.gif')) return 'image/gif';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

async function uploadSampleData() {
  const files = await walkFiles(sampleDataDir);
  const localKeys = new Set();

  for (const filePath of files) {
    const relativeKey = path.relative(sampleDataDir, filePath).replace(/\\/g, '/');
    localKeys.add(relativeKey);
    const body = await readFile(filePath);

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: relativeKey,
        Body: body,
        ContentType: contentTypeFor(filePath),
      }),
    );

    console.log(`Uploaded data: ${relativeKey}`);
  }

  console.log(`Data upload complete. Total files uploaded: ${files.length}`);

  const managedPrefixes = ['books/', 'posts/', 'podcasts/', 'videos/', 'pages/'];
  const bucketKeys = await listAllKeys();
  const staleKeys = bucketKeys.filter(
    (key) => managedPrefixes.some((prefix) => key.startsWith(prefix)) && !localKeys.has(key),
  );

  for (const staleKey of staleKeys) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: staleKey,
      }),
    );

    console.log(`Deleted stale data: ${staleKey}`);
  }

  console.log(`Stale cleanup complete. Total files deleted: ${staleKeys.length}`);
}

async function uploadPublicImagesToMedia() {
  const files = await walkFiles(publicImagesDir);
  const imageFiles = files.filter((filePath) => imageExt.test(filePath));

  for (const filePath of imageFiles) {
    const relativePath = path.relative(publicImagesDir, filePath).replace(/\\/g, '/');
    const mediaKey = `media/${relativePath}`;
    const body = await readFile(filePath);

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: mediaKey,
        Body: body,
        ContentType: contentTypeFor(filePath),
      }),
    );

    console.log(`Uploaded image: ${mediaKey}`);
  }

  console.log(`Image upload complete. Total images uploaded: ${imageFiles.length}`);
}

async function run() {
  console.log(`Using bucket: ${bucket}`);
  console.log(`Using region: ${region}`);

  await downloadImages();
  await uploadPublicImagesToMedia();
  await uploadSampleData();

  console.log('All tasks completed successfully.');
}

run().catch((error) => {
  console.error('S3 transfer failed:', error?.message || error);
  process.exit(1);
});
