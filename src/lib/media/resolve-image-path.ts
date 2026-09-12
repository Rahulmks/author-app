export function resolveImagePath(imagePath?: string): string | undefined {
  if (!imagePath) {
    return undefined;
  }

  const bucket = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;

  const toS3Url = (objectKey: string) => {
    if (!bucket || !region) {
      return undefined;
    }

    const encodedKey = objectKey
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');

    return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
  };

  if (
    imagePath.startsWith('/') ||
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:') ||
    imagePath.startsWith('blob:')
  ) {
    if (imagePath.startsWith('/images/') && bucket && region) {
      const objectKey = `media/${imagePath.slice('/images/'.length)}`;
      return toS3Url(objectKey) ?? imagePath;
    }

    return imagePath;
  }

  if (imagePath.startsWith('media/')) {
    return toS3Url(imagePath) ?? `/images/${imagePath.slice('media/'.length)}`;
  }

  return `/${imagePath}`;
}