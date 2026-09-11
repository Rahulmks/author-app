import { Book } from '@/types/book';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'காற்றின் குரல்',
    slug: 'voice-of-the-wind',
    description: 'ஒரு சிறு கிராமத்தில் நடக்கும் அசாதாரண நிகழ்வுகளின் கதை. இயற்கையும் மனிதர்களும் எவ்வாறு ஒன்றிணைகின்றன என்பதை விவரிக்கும் நாவல்.',
    coverImage: '/images/placeholder.svg',
    publicationYear: 2024,
    publishedYear: 2024,
    publisher: 'Literary Press',
    isbn: '978-1-234567-89-0',
    language: 'Tamil',
    purchaseLinks: [
      { label: 'Amazon', url: 'https://amazon.com' },
      { label: 'Goodreads', url: 'https://goodreads.com' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Silent Echoes',
    slug: 'silent-echoes',
    description: 'A collection of interconnected short stories exploring themes of memory, loss, and redemption. Each story stands alone yet contributes to a larger narrative tapestry.',
    coverImage: '/images/placeholder.svg',
    publicationYear: 2023,
    publishedYear: 2023,
    publisher: 'Modern Fiction House',
    isbn: '978-1-234567-90-6',
    language: 'English',
    purchaseLinks: [
      { label: 'Amazon', url: 'https://amazon.com' },
      { label: 'Goodreads', url: 'https://goodreads.com' },
    ],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'நிழல்களின் நகரம்',
    slug: 'city-of-shadows',
    description: 'நவீன நகர வாழ்க்கையின் சவால்களை எதிர்கொள்ளும் ஒரு இளைஞரின் பயணம். தனிமை, அடையாளம், மற்றும் சமூகம் பற்றிய ஆழமான கதை.',
    coverImage: '/images/placeholder.svg',
    publicationYear: 2022,
    publishedYear: 2022,
    publisher: 'Tamil Literary Publishers',
    isbn: '978-1-234567-91-3',
    language: 'Tamil',
    purchaseLinks: [
      { label: 'Amazon', url: 'https://amazon.com' },
      { label: 'Goodreads', url: 'https://goodreads.com' },
    ],
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'The Weight of Words',
    slug: 'weight-of-words',
    description: 'Essays on writing, reading, and the power of language. A meditation on why stories matter and how they shape our understanding of ourselves and others.',
    coverImage: '/images/placeholder.svg',
    publicationYear: 2021,
    publishedYear: 2021,
    publisher: 'Essay Press',
    isbn: '978-1-234567-92-0',
    language: 'English',
    purchaseLinks: [
      { label: 'Amazon', url: 'https://amazon.com' },
      { label: 'Goodreads', url: 'https://goodreads.com' },
    ],
    createdAt: '2021-01-01T00:00:00Z',
    updatedAt: '2021-01-01T00:00:00Z',
  },
];

export const getBookBySlug = (slug: string): Book | undefined => {
  return mockBooks.find(book => book.slug === slug);
};
