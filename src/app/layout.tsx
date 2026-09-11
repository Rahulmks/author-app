import type { Metadata } from 'next';
import { Noto_Sans_Tamil, Noto_Serif_Tamil } from 'next/font/google';
import '../styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const bodyFont = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const displayFont = Noto_Serif_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'எழுத்தாளர் இல்லம் | கட்டுரைகள், நூல்கள், குரல் மற்றும் காட்சி',
  description: 'தமிழிலும் ஆங்கிலத்திலும் இயங்கும் ஒரு எழுத்தாளரின் தனிப்பட்ட படைப்புலகம்',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
