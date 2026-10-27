# Style Guide & Whole-App Cohesion System

This document outlines the shared component patterns, page art direction roles, and visual system governing the Author App.

---

## 1. Page Roles & Art Direction

To ensure every page feels like part of one cohesive publication while maintaining distinct editorial purpose, each page fulfills a specific role:

| Page | Role | Layout & Rhythm | Key Components |
|---|---|---|---|
| **Home (`/`)** | **Cover** | Asymmetric hero block + featured banner + latest table of contents | `Header`, `FeaturedPost`, `PostCard`, `ManuscriptDivider` |
| **Posts (`/posts`)** | **Index** | Table of contents list density with hairline dividers | `PostCard` (compact horizontal layout with square thumbnails) |
| **Post Detail (`/posts/[slug]`)** | **Manuscript** | Single column (`max-w-[68ch]`), drop cap first letter, pull quotes | `PostMetadata`, `ReadingProgressBar`, top wayfinding link |
| **Books (`/books`)** | **Shelf** | 2–4 column grid of book covers with interactive hover quotes | `BookCard` with hover pull-quote reveal |
| **Book Detail (`/books/[slug]`)** | **Volume** | Dual-column focus (`max-w-[260px]` cover + metadata panel) | Purchase links, top wayfinding link |
| **Events (`/events`)** | **Timeline** | Chronological timeline list with vertical rule and node markers | `EventCard` with timeline node dot |
| **Videos (`/videos`)** | **Reel** | Strict 16:9 thumbnail grid with play overlay button & duration badge | `VideoCard` (with inline YouTube player option) |
| **Podcast (`/podcast`)** | **Playlist** | Sequential episode list with episode markers and platform links | `PodcastCard` (with square artwork) |
| **About (`/about`)** | **Letter** | Text-forward personal letter, author portrait, and living status card | Author profile + "Currently on desk" widget |

---

## 2. Shared Component Library

All pages consume shared components to prevent visual drift:

- **`Container`** (`src/components/layout/Container.tsx`): Shared max-width layout wrapper (`content` 1280px, `article` 780px).
- **`Header`** (`src/components/layout/Header.tsx`): Persistent header with active route underline and responsive mobile drawer.
- **`PostCard`** (`src/components/posts/PostCard.tsx`): Standardized list entry for writings with fixed `w-20 md:w-24` thumbnails, inline metadata, and 1-line excerpt cap.
- **`BookCard`** (`src/components/books/BookCard.tsx`): Standardized book cover entry with `2:3` aspect ratio and hover quote overlay.
- **`VideoCard`** (`src/components/media/VideoCard.tsx`): Standardized `16:9` video entry with play affordance overlay, duration badge, and inline video playback.
- **`PodcastCard`** (`src/components/media/PodcastCard.tsx`): Standardized episode entry with `1:1` square art, duration, date, and streaming platform links.
- **`EventCard`** (`src/components/events/EventCard.tsx`): Timeline event entry with left node marker and date/venue metadata.
- **`ReadingProgressBar`** (`src/components/ui/ReadingProgressBar.tsx`): Thin scroll progress indicator at top viewport for long-form post reading.
- **`EmptyState`** (`src/components/ui/EmptyState.tsx`): On-brand empty placeholder for empty content categories.

---

## 3. Design System Tokens & Typography

- **Palette**: Vintage cinema-ticket / manuscript palette defined in CSS variables. The raspberry-pink highlight is reserved for small wayfinding and editorial details, including active and hovered navigation; use the semantic `--highlight-text` token so contrast stays appropriate in both themes. Keep primary calls to action in the warm CTA color.
- **Font Stack**: Google Fonts `Noto_Sans_Tamil` (sans) and `Noto_Serif_Tamil` (display serif) loaded with `font-display: swap`.
- **Typography Hierarchy**:
  - `H1`: Page Titles — `text-3xl font-semibold md:text-4xl`
  - `H2`: Section Headings — `text-xl font-semibold md:text-2xl`
  - `H3`: Item/Card Titles — `text-base font-medium md:text-lg`
  - Body: `text-base md:text-lg` with `line-height: 1.95` in articles
- **Dates & Metadata**: Formatted consistently using `formatTamilDate` in `ta-IN` locale (`10 செப்., 2026`).

---

## 4. Quality & Performance Signals

1. **Zero CLS**: Fixed aspect ratios reserved for all images (`aspect-[2/3]`, `aspect-[16/9]`, `aspect-[4/5]`, `aspect-square`).
2. **Wayfinding**: Active route navigation indicators in header + top back links on detail pages (`← தமிழ் எழுத்துகள் அனைத்தும்`, `← நூல்கள் அனைத்தும்`).
3. **Signature Moment**: Reading-progress bar on long-form articles, hover quote reveal on book covers, and "Currently on desk" widget on About page.
