import { Post } from '@/types/post';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'கதைகளின் சக்தி',
    slug: 'power-of-stories',
    excerpt: 'Mock data for testing: கதைகள் எவ்வாறு நமது வாழ்க்கையை மாற்றுகின்றன என்பது பற்றிய ஆய்வு. ஒவ்வொரு கதையும் நமக்கு ஒரு பாடத்தை கற்பிக்கிறது.',
    content: '<h2>கதைகளின் சக்தி</h2><p>Mock data for testing: கதைகள் மனித வரலாற்றில் எப்போதும் ஒரு முக்கிய பங்கு வகித்துள்ளன. அவை நமது அனுபவங்களை பகிர்ந்துகொள்வதற்கும், பாடங்களை கற்பதற்கும், மற்றும் ஒருவரையொருவர் இணைப்பதற்கும் ஒரு வழியாகும்.</p><h3>கதைகளின் முக்கியத்துவம்</h3><p>ஒவ்வொரு கதையும் ஒரு உலகம். அது நமக்கு புதிய பார்வைகளை வழங்குகிறது, புதிய சிந்தனைகளை தூண்டுகிறது. கதைகள் நமது கற்பனையை விரிவுபடுத்துகின்றன.</p><blockquote>"ஒரு நல்ல கதை ஆயிரம் பேருக்கு ஆயிரம் வழிகளில் அர்த்தம் தருகிறது"</blockquote><p>நாம் படிக்கும் ஒவ்வொரு கதையிலும் நம்மை நாமே காண்கிறோம். அந்த கதாபாத்திரங்களின் மூலம் நம் உணர்வுகளை புரிந்துகொள்கிறோம்.</p><h3>எழுத்தின் பயணம்</h3><p>எழுத்து என்பது ஒரு தனிமையான பயணம். ஆனால் அது வாசகர்களை சந்திக்கும்போது ஒரு கூட்டு அனுபவமாக மாறுகிறது.</p>',
    contentFormat: 'html',
    coverImage: '/images/placeholder.svg',
    author: 'எழுத்தாளர்',
    status: 'published',
    category: 'Essays',
    tags: ['stories', 'writing'],
    publishedAt: '2026-09-01T10:00:00Z',
    createdAt: '2026-08-30T10:00:00Z',
    updatedAt: '2026-09-01T10:00:00Z',
    readingTimeMinutes: 8,
    featured: true,
    published: true,
    source: 'mock',
    seo: {
      title: 'கதைகளின் சக்தி',
      description: 'Mock data for testing: கதைகள் எவ்வாறு நமது வாழ்க்கையை மாற்றுகின்றன என்பது பற்றிய ஆய்வு.',
      canonicalUrl: '/posts/power-of-stories',
    },
  },
  {
    id: '2',
    title: 'The Art of Writing',
    slug: 'art-of-writing',
    excerpt: 'Exploring the craft of storytelling and the discipline required to write meaningful prose that resonates with readers.',
    content: '<h2>The Art of Writing</h2><p>Writing is both an art and a craft. It requires dedication, practice, and a willingness to revise.</p><h3>Finding Your Voice</h3><p>Every writer must discover their unique voice. This comes through practice and experimentation.</p><p>The best writing often comes from personal experience and genuine emotion. Don&apos;t be afraid to be vulnerable on the page.</p><blockquote>"Write what you know, but also write what you want to discover"</blockquote><h3>The Writing Process</h3><ul><li>Draft freely — don&apos;t edit while you create.</li><li>Revise ruthlessly — cut what doesn&apos;t serve the story.</li><li>Read widely — learn from other writers.</li><li>Practice daily — writing is a muscle.</li></ul><p>Inspiration is fickle. Discipline is reliable. Show up to the page every day, whether inspired or not.</p>',
    contentFormat: 'html',
    coverImage: '/images/placeholder.svg',
    author: 'எழுத்தாளர்',
    status: 'published',
    category: 'Writing',
    tags: ['writing', 'craft'],
    publishedAt: '2026-08-25T10:00:00Z',
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z',
    readingTimeMinutes: 6,
    featured: false,
    published: true,
    source: 'mock',
    seo: {
      title: 'The Art of Writing',
      description: 'Mock data for testing: exploring the craft of storytelling and the discipline required to write meaningful prose.',
      canonicalUrl: '/posts/art-of-writing',
    },
  },
  {
    id: '3',
    title: 'நினைவுகளின் நூலகம்',
    slug: 'library-of-memories',
    excerpt: 'ஒவ்வொரு மனிதனும் ஒரு நூலகம். அவர்களின் நினைவுகள் புத்தகங்கள். சில மங்கிப்போகின்றன, சில என்றும் தெளிவாக இருக்கின்றன.',
    content: '<h2>நினைவுகளின் நூலகம்</h2><p>நமது மனதில் சேமிக்கப்பட்டிருக்கும் நினைவுகள் ஒரு பெரிய நூலகம் போன்றவை.</p><h3>நினைவுகளின் சக்தி</h3><p>சில நினைவுகள் நம்மை சிரிக்க வைக்கின்றன, சில நம்மை அழ வைக்கின்றன. ஆனால் அனைத்து நினைவுகளும் நம்மை உருவாக்குகின்றன.</p>',
    contentFormat: 'html',
    coverImage: '/images/placeholder.svg',
    author: 'எழுத்தாளர்',
    status: 'published',
    category: 'Reflections',
    tags: ['memory', 'identity'],
    publishedAt: '2026-08-15T10:00:00Z',
    createdAt: '2026-08-12T10:00:00Z',
    updatedAt: '2026-08-15T10:00:00Z',
    readingTimeMinutes: 5,
    featured: false,
    published: true,
    source: 'mock',
    seo: {
      title: 'நினைவுகளின் நூலகம்',
      description: 'Mock data for testing: நினைவுகள் மற்றும் மனித அடையாளத்தின் கூட்டுறவு.',
      canonicalUrl: '/posts/library-of-memories',
    },
  },
  {
    id: '4',
    title: 'Observations on Solitude',
    slug: 'observations-on-solitude',
    excerpt: 'In the quiet moments alone, we often find the clearest truths about ourselves and the world around us.',
    content: '<h2>Observations on Solitude</h2><p>Solitude is not loneliness. It is a deliberate retreat into oneself.</p><h3>The Gift of Silence</h3><p>In our noisy world, silence has become rare. Yet it is in silence that we hear our truest thoughts.</p><p>Solitude allows for reflection, for processing, for understanding. It is where creativity is born.</p>',
    contentFormat: 'html',
    coverImage: '/images/placeholder.svg',
    author: 'எழுத்தாளர்',
    status: 'published',
    category: 'Reflections',
    tags: ['solitude', 'reflection'],
    publishedAt: '2026-08-10T10:00:00Z',
    createdAt: '2026-08-05T10:00:00Z',
    updatedAt: '2026-08-10T10:00:00Z',
    readingTimeMinutes: 7,
    featured: false,
    published: true,
    source: 'mock',
    seo: {
      title: 'Observations on Solitude',
      description: 'Mock data for testing: solitude as a path to reflection, creativity, and clarity.',
      canonicalUrl: '/posts/observations-on-solitude',
    },
  },
  {
    id: '5',
    title: 'மொழியின் அழகு',
    slug: 'beauty-of-language',
    excerpt: 'தமிழ் மொழியின் செழுமையும் அழகும் பற்றிய சிந்தனைகள். ஒவ்வொரு சொல்லும் ஒரு கவிதை.',
    content: '<h2>மொழியின் அழகு</h2><p>மொழி என்பது வெறும் தொடர்பு சாதனம் அல்ல. அது ஒரு கலை.</p><h3>தமிழின் செழுமை</h3><p>தமிழ் மொழி ஆயிரக்கணக்கான ஆண்டுகள் பழமையானது. அதன் இலக்கியம், இலக்கணம், செவ்வியல் பாடல்கள் - அனைத்தும் நமது பெருமைகள்.</p>',
    contentFormat: 'html',
    coverImage: '/images/placeholder.svg',
    author: 'எழுத்தாளர்',
    status: 'published',
    category: 'Essays',
    tags: ['language', 'poetry'],
    publishedAt: '2026-08-05T10:00:00Z',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-05T10:00:00Z',
    readingTimeMinutes: 6,
    featured: false,
    published: true,
    source: 'mock',
    seo: {
      title: 'மொழியின் அழகு',
      description: 'Mock data for testing: தமிழ் மொழியின் அழகையும் செழுமையையும் பற்றிய சிந்தனை.',
      canonicalUrl: '/posts/beauty-of-language',
    },
  },
  {
    id: '6',
    title: 'On Reading and Living',
    slug: 'on-reading-and-living',
    excerpt: 'Books are not an escape from life, but a deeper engagement with it. Through reading, we live a thousand lives.',
    content: '<h2>On Reading and Living</h2><p>To read is to live multiple lives in one lifetime.</p><h3>The Reader&apos;s Journey</h3><p>Every book is a portal to another consciousness. We see through different eyes, feel through different hearts.</p><p>Reading builds empathy. It expands our understanding of the human experience.</p>',
    contentFormat: 'html',
    coverImage: '/images/placeholder.svg',
    author: 'எழுத்தாளர்',
    status: 'published',
    category: 'Essays',
    tags: ['reading', 'life'],
    publishedAt: '2026-07-28T10:00:00Z',
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-28T10:00:00Z',
    readingTimeMinutes: 5,
    featured: false,
    published: true,
    source: 'mock',
    seo: {
      title: 'On Reading and Living',
      description: 'Mock data for testing: reflections on the life-changing practice of reading.',
      canonicalUrl: '/posts/on-reading-and-living',
    },
  },
];

export const getFeaturedPost = (): Post | undefined => {
  return mockPosts.find(post => post.featured);
};

export const getLatestPosts = (count: number = 3): Post[] => {
  return mockPosts
    .filter(post => post.published)
    .sort((a, b) => {
      const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bDate - aDate;
    })
    .slice(0, count);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return mockPosts.find(post => post.slug === slug);
};
