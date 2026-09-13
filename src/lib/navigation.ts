export interface NavigationItem {
  name: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { name: 'முகப்பு', href: '/' },
  { name: 'எழுத்துகள்', href: '/posts' },
  { name: 'காணொளிகள்', href: '/videos' },
  { name: 'நூல்கள்', href: '/books' },
  { name: 'நிகழ்வுகள்', href: '/events' },
];

export const siteConfig = {
  authorName: 'லட்சுமிஹர்',
  authorTitle: 'எழுத்தாளர் • நாவலாசிரியர்',
  tagline: 'கதைகள், கட்டுரைகள், நினைவுகளின் மெளனம்',
  email: 'author@example.com',
  social: {
    youtube: 'https://youtube.com',
    spotify: 'https://spotify.com',
    instagram: 'https://instagram.com',
  },
};

const tamilNumberFormatter = new Intl.NumberFormat('ta-IN');

const tamilDateFormatters = {
  short: new Intl.DateTimeFormat('ta-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  long: new Intl.DateTimeFormat('ta-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
};

export function formatTamilDate(date: string, style: 'short' | 'long' = 'short') {
  return tamilDateFormatters[style].format(new Date(date));
}

export function formatTamilReadingTime(minutes: number) {
  return `${tamilNumberFormatter.format(minutes)} நிமிட வாசிப்பு`;
}

export function formatTamilEpisode(episodeNumber: number) {
  return `அத்தியாயம் ${tamilNumberFormatter.format(episodeNumber)}`;
}
