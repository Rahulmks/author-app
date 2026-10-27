import type { Viewport } from 'next';
import '../../styles/globals.css';
import { fontVariables } from '@/lib/fonts';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#93CBC4',
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
