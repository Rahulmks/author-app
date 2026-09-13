import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        foreground: 'var(--foreground)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-color': 'var(--border-color)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'accent-secondary': 'var(--accent-secondary)',
        surface: 'var(--surface)',
        'surface-foreground': 'var(--surface-foreground)',
        paper: 'var(--paper)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        tamil: ['var(--font-tamil)'],
      },
      maxWidth: {
        'content': '1280px',
        'article': '780px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '780px',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
