import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const image = await readFile(path.join(process.cwd(), 'public/images/og-image.png'));

  return new Response(image, {
    headers: { 'Content-Type': contentType },
  });
}
