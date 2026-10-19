import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Token-only palette: every color resolves to a CSS variable in globals.css, so
    // default framework grays/blues cannot leak in. `cream` and `paper` are the
    // semantic panel/card surfaces and flip with the color scheme.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: 'var(--paper)',
      'wall-base': 'var(--wall-base)',
      'wall-light': 'var(--wall-light)',
      'wall-dark': 'var(--wall-dark)',
      ink: 'var(--ink)',
      'ink-soft': 'var(--ink-soft)',
      cream: 'var(--surface-panel)',
      paper: 'var(--surface-card)',
      line: 'var(--line)',
      cta: 'var(--cta)',
      pink: 'var(--pink)',
      highlight: 'var(--highlight-text)',
      sun: 'var(--sun)',
      sky: 'var(--sky)',
      link: 'var(--link)',
      'text-primary': 'var(--text-primary)',
      'text-secondary': 'var(--text-secondary)',
    },
    fontFamily: {
      sans: ['var(--font-sans)'],
      display: ['var(--font-display)'],
    },
    // Type scale: 12 / 14 / 16 / 20 / 28 / 40
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.55' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.25rem', { lineHeight: '1.5' }],
      xl: ['1.25rem', { lineHeight: '1.5' }],
      '2xl': ['1.75rem', { lineHeight: '1.3' }],
      '3xl': ['1.75rem', { lineHeight: '1.3' }],
      '4xl': ['2.5rem', { lineHeight: '1.15' }],
      '5xl': ['2.5rem', { lineHeight: '1.15' }],
      '6xl': ['2.5rem', { lineHeight: '1.15' }],
    },
    boxShadow: {
      card: 'var(--shadow-card)',
      button: 'var(--shadow-button)',
      none: 'none',
    },
    extend: {
      maxWidth: {
        content: '1200px',
        article: '780px',
      },
    },
  },
  plugins: [],
};

export default config;
