export interface BookPurchaseLink {
  label: string;
  url: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  publicationYear?: number;
  publisher?: string;
  purchaseLinks?: BookPurchaseLink[] | Record<string, string | undefined>;
  isbn?: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
  publishedYear?: number;
  purchaseUrl?: string;
}
