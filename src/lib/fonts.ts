import { Fraunces, Inter, Noto_Sans_Tamil, Noto_Serif_Tamil } from 'next/font/google';

// Latin: Fraunces (display) + Inter (UI/body).
// Tamil: Noto families, picked up per-glyph through the fallback stacks in globals.css.
const displayLatin = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

const bodyLatin = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const bodyTamil = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-tamil',
  display: 'swap',
});

const displayTamil = Noto_Serif_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-tamil',
  display: 'swap',
});

/** Class names that define the font CSS variables; apply to <body>. */
export const fontVariables = [
  displayLatin.variable,
  bodyLatin.variable,
  bodyTamil.variable,
  displayTamil.variable,
].join(' ');
