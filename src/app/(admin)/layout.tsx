import type { Viewport } from 'next';
import '../../styles/globals.css';
import { bodyFont, displayFont } from '@/lib/fonts';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1225',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
