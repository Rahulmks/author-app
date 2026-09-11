# Author Website

A content-driven author website built with Next.js, TypeScript, and Tailwind CSS, using AWS S3 for content storage.

## Features

- 📝 Blog posts with rich content
- 📚 Books showcase
- 🎥 Videos collection
- 🎙️ Podcast episodes
- 👤 Author profile and about page
- 📧 Contact information
- 🔐 Secure admin panel for content management
- ⚡ Fast, SEO-optimized pages
- 📱 Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content Storage**: AWS S3
- **Authentication**: Auth.js (planned)
- **Hosting**: Vercel (planned)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- AWS account with S3 access

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required values in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Business logic and utilities
├── types/           # TypeScript type definitions
└── styles/          # Global styles

docs/                # Documentation
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System architecture and design decisions
- [Product Spec](docs/PRODUCT_SPEC.md) - Product requirements and features
- [Implementation](docs/IMPLEMENTATION.md) - Implementation guide and checklist

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Key Features

### No Database Required
Content is stored in AWS S3, eliminating the need for a traditional database in V1.

### No Redeployment for Content
Publishing new content or editing existing content does not require redeployment.

### Secure Admin Panel
Content management is handled through a secure admin interface with authentication.

### SEO Optimized
Server-side rendering and static generation ensure excellent SEO performance.

## License

Private project
