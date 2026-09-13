export function resolveImagePath(imagePath?: string): string | undefined {
  if (!imagePath) {
    return undefined;
  }

  const bucket = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;

  const toUrl = (objectKey: string) => {
    const cleanKey = objectKey.replace(/^\/+/, '');
    if (bucket && region) {
      return `/api/media/${cleanKey}`;
    }
    if (cleanKey.startsWith('media/')) {
      return `/images/${cleanKey.slice('media/'.length)}`;
    }
    return `/${cleanKey}`;
  };

  if (imagePath.startsWith('/api/media/')) {
    return imagePath;
  }

  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:') ||
    imagePath.startsWith('blob:')
  ) {
    if (imagePath.includes('.amazonaws.com/')) {
      const urlParts = imagePath.split('.amazonaws.com/');
      if (urlParts[1]) {
        const objectKey = decodeURIComponent(urlParts[1]);
        return toUrl(objectKey);
      }
    }
    return imagePath;
  }

  if (imagePath.startsWith('/images/')) {
    const objectKey = `media/${imagePath.slice('/images/'.length)}`;
    return toUrl(objectKey);
  }

  if (imagePath.startsWith('images/')) {
    const objectKey = `media/${imagePath.slice('images/'.length)}`;
    return toUrl(objectKey);
  }

  if (imagePath.startsWith('media/') || imagePath.startsWith('/media/')) {
    return toUrl(imagePath);
  }

  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
}