export interface NavigationItem {
  /** Key under `nav` in the messages files. */
  key: string;
  href: string;
  hidden?: boolean;
  children?: NavigationItem[];
}

// Category hrefs keep the stored Tamil category value; only the label is translated.
export const navigationItems: NavigationItem[] = [
  { key: 'home', href: '/' },
  {
    key: 'posts',
    href: '/posts',
    children: [
      { key: 'story', href: '/posts?category=கதை' },
      { key: 'essay', href: '/posts?category=கட்டுரை' },
      { key: 'experience', href: '/posts?category=அனுபவ பகிர்வு' },
      { key: 'criticism', href: '/posts?category=விமர்சனம்' },
      { key: 'readerLetter', href: '/posts?category=வாசகர் கடிதம்' },
      { key: 'cinema', href: '/posts?category=சினிமா' },
    ],
  },
  { key: 'interviews', href: '/interviews' },
  { key: 'events', href: '/events' },
  { key: 'classes', href: '/classes' },
  { key: 'announcements', href: '/announcements' },
  { key: 'podcast', href: '/podcast', hidden: true },
  { key: 'videos', href: '/videos' },
  { key: 'books', href: '/books' },
];

export const siteConfig = {
  email: '',
  social: {
    youtube: '',
    spotify: '',
    instagram: '',
  },
};

const intlLocale: Record<string, string> = { ta: 'ta-IN', en: 'en-IN' };

export function formatDate(date: string, locale: string, style: 'short' | 'long' = 'short') {
  return new Intl.DateTimeFormat(intlLocale[locale] ?? 'ta-IN', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  }).format(new Date(date));
}
