export function resolveImagePath(imagePath?: string): string | undefined {
  if (!imagePath) {
    return undefined;
  }

  const trimmed = imagePath.trim();
  if (!trimmed) {
    return undefined;
  }

  // Already pointing to our media proxy API
  if (trimmed.startsWith('/api/media/')) {
    return trimmed;
  }

  // Data or blob URLs
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Full HTTP/HTTPS URLs
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    // If it's an S3 bucket URL, extract the object key and route through /api/media/
    if (trimmed.includes('.amazonaws.com/')) {
      const parts = trimmed.split('.amazonaws.com/');
      if (parts[1]) {
        const objectKey = decodeURIComponent(parts[1]);
        return resolveImagePath(objectKey);
      }
    }
    // External non-S3 URL
    return trimmed;
  }

  // Normalize path by stripping leading slashes, 'media/', 'images/'
  let cleanKey = trimmed.replace(/^\/+/, '');

  if (cleanKey.startsWith('media/')) {
    cleanKey = cleanKey.slice('media/'.length);
  } else if (cleanKey.startsWith('images/')) {
    cleanKey = cleanKey.slice('images/'.length);
  }

  return `/api/media/${cleanKey}`;
}