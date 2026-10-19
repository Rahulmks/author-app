import { Noto_Sans_Tamil, Noto_Serif_Tamil } from 'next/font/google';

export const bodyFont = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const displayFont = Noto_Serif_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
