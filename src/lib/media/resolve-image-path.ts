export function resolveImagePath(imagePath?: string): string | undefined {
  if (!imagePath) {
    return undefined;
  }

  if (
    imagePath.startsWith('/') ||
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:')
  ) {
    return imagePath;
  }

  if (imagePath.startsWith('media/')) {
    return `/images/${imagePath.slice('media/'.length)}`;
  }

  return `/${imagePath}`;
}