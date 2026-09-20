export interface NavigationItem {
  name: string;
  href: string;
  hidden?: boolean;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  { name: 'முகப்பு', href: '/' },
  {
    name: 'பதிவுகள்',
    href: '/posts',
    children: [
      { name: 'கதை', href: '/posts?category=கதை' },
      { name: 'கட்டுரை', href: '/posts?category=கட்டுரை' },
      { name: 'அனுபவ பகிர்வு', href: '/posts?category=அனுபவ பகிர்வு' },
      { name: 'விமர்சனம்', href: '/posts?category=விமர்சனம்' },
      { name: 'வாசகர் கடிதம்', href: '/posts?category=வாசகர் கடிதம்' },
      { name: 'சினிமா', href: '/posts?category=சினிமா' },
    ],
  },
  { name: 'நேர்காணல்', href: '/interviews' },
  { name: 'நிகழ்வுகள்', href: '/events' },
  { name: 'வகுப்பு', href: '/classes' },
  { name: 'அறிவிப்புகள்', href: '/announcements' },
  { name: 'ஒலிப்பதிவு', href: '/podcast', hidden: true },
  { name: 'காணொளிகள்', href: '/videos' },
  { name: 'நூல்கள்', href: '/books' },
];

export const siteConfig = {
  authorName: 'லட்சுமிஹர்',
  authorTitle: 'எழுத்தாளர்',
  tagline: 'கதைகள், கட்டுரைகள், நினைவுகளின் மெளனம்',
  email: '',
  social: {
    youtube: '',
    spotify: '',
    instagram: '',
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
