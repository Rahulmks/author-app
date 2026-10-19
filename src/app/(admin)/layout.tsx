import type { Viewport } from 'next';
import '../../styles/globals.css';
import { fontVariables } from '@/lib/fonts';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#93CBC4' },
    { media: '(prefers-color-scheme: dark)', color: '#1D1B4D' },
  ],
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta">
      <body className={`${fontVariables} font-sans`}>
        {children}
      </body>
    </html>
  );
}
