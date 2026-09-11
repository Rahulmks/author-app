# Author Website – Final Architecture Plan

## 1. Overview

This document defines the final architecture for a content-driven author/personal website inspired by the reference site discussed earlier.

The primary goals are:

- Public website for articles, books, videos, podcasts, author information, and contact details.
- Secure admin panel for creating, editing, publishing, and deleting content.
- No traditional SQL/NoSQL database in V1.
- No redeployment required when publishing or editing content.
- Low infrastructure cost.
- Strong SEO and performance.
- Simple long-term maintenance.
- Clear migration path to a database or CMS if the site grows.

---

## 2. Final Technology Stack

### Frontend / Full-stack Framework

- **Next.js**
- **React**
- **TypeScript**

Next.js is used instead of plain React + Vite because this project is heavily content-driven and benefits from:

- Server-side rendering.
- Static and dynamic rendering.
- SEO metadata.
- Route handlers.
- Server components.
- Server actions.
- Image optimization.
- Caching and revalidation.
- File-based routing.

### Styling

- **Tailwind CSS**

Tailwind CSS will be used for:

- Responsive layouts.
- Typography.
- Reusable UI components.
- Admin dashboard styling.
- Mobile-first design.

### Content Storage

- **AWS S3**

S3 will store:

- Articles.
- Article metadata.
- Book data.
- Video metadata.
- Podcast metadata.
- Cover images.
- Article images.
- Profile images.
- Other uploaded media.

### Authentication

Preferred:

- **Auth.js**

Alternative for a single-admin setup:

- Secure credentials-based authentication.
- Signed HTTP-only cookie sessions.

### Hosting

- **Vercel**

Vercel hosts the Next.js application.

### Source Control

- **GitHub**

GitHub is used only for source code and deployment integration.

Content publishing does **not** require commits or deployments.

---

## 3. High-Level System Architecture

```text
                           ┌─────────────────────────┐
                           │      yourdomain.com     │
                           └────────────┬────────────┘
                                        │
                                        ▼
                           ┌─────────────────────────┐
                           │         Vercel          │
                           │                         │
                           │        Next.js          │
                           │   TypeScript + Tailwind │
                           └────────────┬────────────┘
                                        │
                  ┌─────────────────────┴─────────────────────┐
                  │                                           │
                  ▼                                           ▼
        ┌─────────────────────┐                   ┌─────────────────────┐
        │   Public Website    │                   │     Admin Panel     │
        │                     │                   │                     │
        │ Home                │                   │ Login               │
        │ About               │                   │ Dashboard           │
        │ Posts               │                   │ Create Post         │
        │ Books               │                   │ Edit Post           │
        │ Videos              │                   │ Delete Post         │
        │ Podcast             │                   │ Manage Books        │
        │ Contact             │                   │ Manage Videos       │
        │                     │                   │ Manage Podcasts     │
        └─────────┬───────────┘                   │ Upload Media        │
                  │                               └─────────┬───────────┘
                  │                                         │
                  └─────────────────────┬───────────────────┘
                                        │
                                        ▼
                           ┌─────────────────────────┐
                           │  Next.js Server Layer  │
                           │                         │
                           │ Route Handlers         │
                           │ Server Actions         │
                           │ Authentication         │
                           │ Validation             │
                           │ Cache Revalidation     │
                           │ AWS SDK Integration    │
                           └────────────┬────────────┘
                                        │
                                        ▼
                           ┌─────────────────────────┐
                           │        AWS S3           │
                           │                         │
                           │ Posts                   │
                           │ Indexes                 │
                           │ Books                   │
                           │ Videos                  │
                           │ Podcasts                │
                           │ Images / Media          │
                           └─────────────────────────┘
```

---

## 4. Core Architectural Principle

S3 acts as a lightweight content repository.

The public site reads published content from S3 at runtime or through cached server-side reads.

The admin panel writes content to S3 through trusted Next.js server-side code.

This means:

```text
Publishing content ≠ deploying application code
```

Deployment is required only when application code changes.

Examples:

- New UI component.
- Design change.
- New feature.
- Bug fix.
- New route.

Creating or editing an article does not require a deployment.

---

## 5. Public Website Routes

Recommended route structure:

```text
/
├── /about
├── /posts
├── /posts/[slug]
├── /books
├── /books/[slug]
├── /videos
├── /podcast
├── /contact
│
└── /admin
    ├── /login
    ├── /dashboard
    ├── /posts
    ├── /posts/new
    ├── /posts/[id]/edit
    ├── /books
    ├── /videos
    ├── /podcasts
    └── /media
```

---

## 6. Public Website Features

### Home Page

The home page can contain:

- Author hero section.
- Profile image.
- Short introduction.
- Featured articles.
- Latest articles.
- Featured books.
- Video section.
- Podcast section.
- Social links.
- Contact information.

### About Page

Contains:

- Author biography.
- Profile image.
- Career/literary background.
- Awards.
- Publications.
- External links.

### Posts Page

Displays:

- Article cards.
- Cover image.
- Title.
- Excerpt.
- Published date.
- Reading time.
- Optional category.
- Pagination or load-more support.

### Individual Post

Route:

```text
/posts/[slug]
```

Contains:

- Title.
- Author.
- Published date.
- Updated date.
- Reading time.
- Cover image.
- Rich article content.
- Inline images.
- Previous/next article.
- Share options.
- SEO metadata.

### Books

Contains:

- Book cover.
- Title.
- Description.
- Publication year.
- Publisher.
- Purchase link.
- Optional detail page.

### Videos

Video data can reference:

- YouTube.
- Vimeo.
- Other external sources.

The actual video files should generally not be stored in S3 unless required.

### Podcast

Podcast data can reference:

- Spotify.
- Apple Podcasts.
- YouTube.
- Other podcast platforms.

---

## 7. Admin Panel

The admin panel lives inside the same Next.js application.

```text
/admin
```

### Main Admin Features

- Secure login.
- Dashboard.
- Create article.
- Edit article.
- Delete article.
- Save draft.
- Publish article.
- Unpublish article.
- Upload cover image.
- Upload inline article images.
- Manage books.
- Manage videos.
- Manage podcasts.
- Media library.
- Preview article.

---

## 8. Admin Publishing Flow

```text
Admin
   ↓
/admin/posts/new
   ↓
Enter title, excerpt, content, metadata
   ↓
Upload images
   ↓
Save Draft / Publish
   ↓
Next.js Server Action or Route Handler
   ↓
Validate input
   ↓
Upload media to S3
   ↓
Write article object to S3
   ↓
Update posts index
   ↓
Revalidate affected routes/cache
   ↓
Article becomes available
```

No deployment occurs.

---

## 9. Recommended S3 Structure

```text
author-site/
│
├── posts/
│   ├── index.json
│   ├── published/
│   │   ├── article-one.json
│   │   ├── article-two.json
│   │   └── ...
│   │
│   └── drafts/
│       ├── draft-one.json
│       └── ...
│
├── books/
│   ├── index.json
│   └── items/
│       ├── book-one.json
│       └── ...
│
├── videos/
│   └── index.json
│
├── podcasts/
│   └── index.json
│
├── pages/
│   ├── about.json
│   └── settings.json
│
└── media/
    ├── profile/
    ├── posts/
    ├── books/
    └── general/
```

---

## 10. Article Data Model

Example article object:

```json
{
  "id": "1e6f4f1b-f45d-4497-9428-a467258be821",
  "title": "My First Article",
  "slug": "my-first-article",
  "excerpt": "A short introduction to the article.",
  "content": "<p>Article content...</p>",
  "contentFormat": "html",
  "coverImage": "media/posts/my-first-article/cover.webp",
  "author": "Author Name",
  "status": "published",
  "category": "Essay",
  "tags": ["literature", "culture"],
  "publishedAt": "2026-09-09T10:30:00Z",
  "createdAt": "2026-09-09T09:00:00Z",
  "updatedAt": "2026-09-09T10:30:00Z",
  "readingTimeMinutes": 7,
  "seo": {
    "title": "My First Article | Author Name",
    "description": "SEO description.",
    "canonicalUrl": "/posts/my-first-article"
  }
}
```

---

## 11. Content Format

There are three reasonable content formats:

### Option A — HTML

Recommended when using a rich-text editor.

```json
{
  "content": "<h2>Heading</h2><p>Article body...</p>"
}
```

Advantages:

- Easy editor integration.
- Easy rendering.
- Best for non-technical authors.

### Option B — Markdown

Recommended for technical editors or developer-controlled sites.

Advantages:

- Human-readable.
- Lightweight.
- Easy versioning.

### Option C — Structured Rich Text JSON

Useful for advanced editors such as TipTap or Lexical.

Advantages:

- Strong formatting control.
- Easy future transformations.

For this project:

> **HTML or structured rich text JSON is recommended for the admin editor.**

---

## 12. Post Index Strategy

Do not list every S3 article object when rendering `/posts`.

Maintain a lightweight index:

```text
posts/index.json
```

Example:

```json
[
  {
    "id": "post-001",
    "title": "Article One",
    "slug": "article-one",
    "excerpt": "Short summary",
    "coverImage": "media/posts/article-one/cover.webp",
    "publishedAt": "2026-09-09T10:00:00Z",
    "readingTimeMinutes": 5
  },
  {
    "id": "post-002",
    "title": "Article Two",
    "slug": "article-two",
    "excerpt": "Short summary",
    "coverImage": "media/posts/article-two/cover.webp",
    "publishedAt": "2026-09-08T10:00:00Z",
    "readingTimeMinutes": 8
  }
]
```

The post listing page reads only this lightweight file.

The full article file is fetched only when the visitor opens the article.

---

## 13. Next.js Project Structure

Recommended project structure:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── posts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── books/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── videos/
│   │   └── page.tsx
│   │
│   ├── podcast/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── posts/
│   │   ├── books/
│   │   ├── videos/
│   │   ├── podcasts/
│   │   └── media/
│   │
│   └── api/
│       ├── auth/
│       ├── posts/
│       ├── upload/
│       ├── books/
│       └── media/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── posts/
│   ├── books/
│   ├── media/
│   └── admin/
│
├── lib/
│   ├── aws/
│   │   ├── s3-client.ts
│   │   ├── s3-read.ts
│   │   ├── s3-write.ts
│   │   └── presigned-url.ts
│   │
│   ├── auth/
│   │   ├── auth.ts
│   │   └── permissions.ts
│   │
│   ├── posts/
│   │   ├── get-post.ts
│   │   ├── get-posts.ts
│   │   ├── create-post.ts
│   │   ├── update-post.ts
│   │   └── delete-post.ts
│   │
│   ├── books/
│   ├── videos/
│   ├── podcasts/
│   ├── validation/
│   └── cache/
│
├── types/
│   ├── post.ts
│   ├── book.ts
│   ├── video.ts
│   └── podcast.ts
│
└── styles/
    └── globals.css
```

---

## 14. Server-Side S3 Access

Permanent AWS credentials must never be sent to the browser.

Correct architecture:

```text
Browser
   ↓
Next.js Server
   ↓
AWS SDK
   ↓
S3
```

Incorrect architecture:

```text
Browser
   ↓
Permanent AWS Access Key
   ↓
S3
```

---

## 15. Image Upload Architecture

Large uploads should ideally avoid passing through the Vercel server.

Recommended approach:

```text
Admin Browser
      ↓
Request upload permission
      ↓
Next.js Server
      ↓
Generate temporary S3 presigned URL
      ↓
Admin Browser
      ↓
Upload image directly to S3
```

The temporary URL expires automatically.

This provides:

- Better upload performance.
- Lower server load.
- Secure access.
- No permanent AWS credentials in the browser.

---

## 16. Image Processing

Recommended upload rules:

- Convert large images to WebP or AVIF.
- Limit maximum dimensions.
- Limit maximum file size.
- Validate file MIME type.
- Generate unique object keys.
- Never trust the client-provided filename.

Example object path:

```text
media/posts/my-first-article/09e1220f-cover.webp
```

---

## 17. Authentication Architecture

### Single Author

For a single-admin site:

```text
/admin/login
     ↓
Credentials validation
     ↓
Server
     ↓
HTTP-only secure session cookie
```

Requirements:

- HTTP-only cookies.
- Secure flag in production.
- SameSite protection.
- Password hashing.
- CSRF-safe actions.
- Rate limiting on login.
- Session expiration.

### Future Multi-Author Support

If multiple authors are introduced later, roles can include:

```text
Admin
Editor
Author
Reviewer
```

At that point, a database-backed authentication system may become preferable.

---

## 18. Authorization

Every write action must verify authorization on the server.

Examples:

```text
Create Post   → Admin only
Edit Post     → Admin only
Delete Post   → Admin only
Upload Media  → Admin only
Manage Books  → Admin only
```

Never rely only on hiding buttons in the frontend.

---

## 19. Validation

Recommended:

- **Zod**

Example validation rules:

```text
Title:
- Required
- Maximum length

Slug:
- Required
- URL-safe
- Unique

Excerpt:
- Optional
- Maximum length

Content:
- Required for published posts

Cover image:
- Valid S3 media reference

Status:
- draft | published
```

---

## 20. Slug Handling

Example:

```text
"My First Article"
```

becomes:

```text
my-first-article
```

Before saving:

1. Normalize title.
2. Generate slug.
3. Check existing post index.
4. Reject duplicates or append suffix.

Example:

```text
my-first-article
my-first-article-2
```

---

## 21. Drafts

Drafts should live separately from published posts.

```text
posts/drafts/
```

Drafts must never appear in:

- Public `/posts`.
- Sitemap.
- RSS.
- Search indexing.

Publishing moves or copies the final article to:

```text
posts/published/
```

and updates:

```text
posts/index.json
```

---

## 22. Cache Strategy

Without caching:

```text
Visitor
   ↓
Next.js
   ↓
S3
```

every request may create an S3 read.

Recommended:

```text
Visitor
   ↓
Vercel / Next.js Cache
   ↓
S3 only when cache is missing or stale
```

### Publishing Flow

```text
Admin publishes
      ↓
S3 updated
      ↓
revalidatePath("/posts")
revalidatePath("/posts/article-slug")
      ↓
New content becomes available
```

This gives:

- Fast pages.
- Low S3 request volume.
- No redeployment.
- Immediate content updates.

---

## 23. SEO Architecture

Every page should support SEO metadata.

### Article Metadata

```html
<title>Article Title | Author Name</title>
<meta name="description" content="Article description" />
<link rel="canonical" href="https://example.com/posts/article-slug" />

<meta property="og:title" content="Article Title" />
<meta property="og:description" content="Article description" />
<meta property="og:image" content="..." />

<meta name="twitter:card" content="summary_large_image" />
```

### Additional SEO

Implement:

- Dynamic sitemap.
- robots.txt.
- Canonical URLs.
- Structured data.
- Open Graph tags.
- Twitter cards.
- Article schema.
- Book schema where appropriate.

---

## 24. Sitemap

Dynamic sitemap should include:

```text
/
 /about
 /posts
 /posts/article-one
 /posts/article-two
 /books
 /books/book-one
 /videos
 /podcast
```

Drafts must never appear.

---

## 25. RSS Feed

Recommended for an author/blog site.

Example route:

```text
/feed.xml
```

RSS should include:

- Article title.
- Link.
- Publication date.
- Excerpt.
- Author.

---

## 26. Search

### V1

Client-side search against the post index is sufficient.

Search fields:

- Title.
- Excerpt.
- Category.
- Tags.

### Future

If the site becomes very large:

- Algolia.
- Typesense.
- Meilisearch.
- OpenSearch.

No search database is required for V1.

---

## 27. Content Security

Rich-text HTML must be sanitized before rendering.

Admin HTML should not be trusted automatically.

Protect against:

- XSS.
- Dangerous script tags.
- Embedded malicious HTML.
- Unsafe iframes.

Video embeds should be restricted to approved providers.

---

## 28. S3 Security

Recommended S3 configuration:

- Block public writes.
- Keep administrative objects private.
- Use IAM least privilege.
- Use presigned URLs for uploads.
- Avoid account root credentials.
- Use dedicated application IAM permissions.

Example required actions:

```text
s3:GetObject
s3:PutObject
s3:DeleteObject
s3:ListBucket
```

Scope these permissions only to the required bucket/prefixes.

---

## 29. Public Media Delivery

Two options:

### Option A — Public Read Objects

Simple for V1.

Only media files are public.

Admin data and drafts remain private.

### Option B — CloudFront

Better when traffic grows.

```text
Visitor
   ↓
CloudFront
   ↓
S3
```

Advantages:

- CDN caching.
- Better global performance.
- Reduced origin requests.
- Custom media domain.

CloudFront is optional for V1.

---

## 30. Environment Variables

Example Vercel variables:

```text
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
S3_BUCKET_NAME

AUTH_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD_HASH

NEXT_PUBLIC_SITE_URL
```

Do not commit secrets to GitHub.

---

## 31. Deployment Architecture

```text
Developer
   ↓
GitHub
   ↓
Vercel
   ↓
Next.js Application
```

Application code changes trigger deployment.

Content changes do not.

### Initial Deployment Tasks

1. Create GitHub repository.
2. Create Next.js project.
3. Create AWS S3 bucket.
4. Create IAM user/role.
5. Configure S3 permissions.
6. Configure environment variables.
7. Connect GitHub to Vercel.
8. Deploy.
9. Configure custom domain.
10. Configure SSL.
11. Verify admin access.
12. Test upload and publishing.

---

## 32. Content Update Flow After Deployment

```text
Author logs into admin
        ↓
Creates article
        ↓
Uploads images
        ↓
Clicks Publish
        ↓
Next.js writes to S3
        ↓
Next.js invalidates cache
        ↓
Post appears on website
```

No GitHub commit.

No Vercel redeployment.

---

## 33. Cost Architecture

Expected primary costs:

### Domain

Approximately:

```text
₹800–₹1,500/year
```

depending on registrar and TLD.

### Vercel

Possible V1:

```text
₹0/month
```

when eligible for the free tier.

Commercial usage may require a paid plan depending on Vercel's current terms and usage.

### AWS S3

For a small author website:

- Article text is negligible.
- Images dominate storage.
- A few GB of content is generally inexpensive.
- Request cost is usually very small at low/moderate traffic.

Recommended:

- Create an AWS Budget.
- Configure cost alerts.

Example:

```text
Monthly budget: ₹200

50%  → warning
80%  → warning
100% → warning
```

---

## 34. Monitoring

Recommended V1 monitoring:

- Vercel logs.
- Vercel Analytics if required.
- AWS Billing alerts.
- S3 request metrics if needed.

Future:

- Sentry.
- CloudWatch.
- Better performance monitoring.

---

## 35. Backup Strategy

S3 should not be treated as automatically immune to accidental deletion.

Recommended:

- Enable S3 versioning.
- Keep previous versions of content objects.
- Optionally configure lifecycle rules.

This allows recovery when an admin accidentally overwrites or deletes an article.

---

## 36. Versioning

Enable S3 versioning for:

```text
posts/
books/
pages/
```

This provides lightweight content history without building a database-backed revision system.

---

## 37. Delete Strategy

Prefer soft-delete-like behavior initially.

Instead of immediately deleting:

```text
posts/published/article.json
```

move it to:

```text
archive/posts/article.json
```

or mark it unpublished.

Permanent deletion can be a separate admin action.

---

## 38. Concurrency Limitation

One important limitation of file-based/S3 content storage is concurrent editing.

Example problem:

```text
Admin A updates index.json
Admin B updates index.json
```

One update could overwrite another.

For a single-author website, this is unlikely to be a problem.

If multiple editors are added, introduce:

- Version checks.
- S3 ETag conditional writes.
- Optimistic concurrency.
- Or migrate metadata to a database.

---

## 39. Atomicity Limitation

Publishing may involve multiple operations:

```text
Upload article
Update index
Invalidate cache
```

If one step fails, content may temporarily become inconsistent.

Mitigation:

1. Write article object first.
2. Confirm upload succeeded.
3. Update index second.
4. Revalidate cache last.
5. Add retry/error handling.

For this project size, this is acceptable.

---

## 40. Why Not GitHub as Content Storage

Git-based content was considered initially.

It was rejected as the main publishing architecture because:

```text
Publish
   ↓
Commit
   ↓
Build
   ↓
Deploy
```

This causes unnecessary deployment for every content change.

GitHub remains useful for application source code only.

---

## 41. Why Not Plain React + Vite

Plain React would require additional architecture for:

- Routing.
- SSR.
- SEO.
- Server endpoints.
- Authentication backend.
- Cache revalidation.
- Secure S3 integration.

Next.js already provides these capabilities within one project.

Therefore:

> Next.js is preferred over standalone React + Vite for this website.

---

## 42. Why No ASP.NET Core Backend

A separate .NET backend is not necessary in V1 because Next.js can provide:

- Server actions.
- Route handlers.
- Authentication.
- AWS SDK calls.
- Validation.
- API endpoints.

Adding ASP.NET Core would introduce:

- Another deployment.
- Another runtime.
- More infrastructure.
- Additional authentication integration.
- Higher operational complexity.

If the project later becomes API-heavy, a separate backend can be introduced.

---

## 43. Why No Database in V1

Current requirements are primarily:

- Articles.
- Books.
- Videos.
- Podcasts.
- Profile content.
- Single admin.
- Media.

These map well to object/file storage.

A traditional database becomes valuable when introducing:

- Multiple users.
- Comments.
- Likes.
- Notifications.
- Complex permissions.
- Advanced workflow.
- Realtime features.
- Complex filtering.
- High-frequency writes.
- Large-scale content relationships.

---

## 44. Future Database Migration

The application should not call S3 directly throughout every component.

Use repository/service interfaces.

Example:

```text
PostRepository
│
├── getPosts()
├── getPostBySlug()
├── createPost()
├── updatePost()
└── deletePost()
```

V1:

```text
PostRepository
   ↓
S3PostRepository
```

Future:

```text
PostRepository
   ↓
DatabasePostRepository
```

The UI remains largely unchanged.

---

## 45. Potential Future Architecture

If the project grows:

```text
Next.js
   │
   ├── Public Website
   └── Admin
        │
        ▼
   Backend / Data Layer
        │
  ┌─────┴─────┐
  ▼           ▼
PostgreSQL    S3
Metadata      Media
```

Potential database choices:

- PostgreSQL.
- Supabase.
- Neon.
- AWS RDS.
- SQL Server if .NET becomes part of the architecture.

---

## 46. Recommended Rich Text Editor

Good options:

- TipTap.
- Lexical.

Recommended V1:

> **TipTap**

Possible features:

- Headings.
- Bold.
- Italic.
- Lists.
- Quotes.
- Links.
- Images.
- YouTube embeds.
- Undo/redo.
- Preview.

---

## 47. Recommended Libraries

Possible supporting libraries:

```text
next
react
typescript
tailwindcss

@aws-sdk/client-s3
@aws-sdk/s3-request-presigner

next-auth / Auth.js

zod

react-hook-form

@tiptap/react
@tiptap/starter-kit

slugify
date-fns
```

Exact package versions should be selected at implementation time based on current stable releases.

---

## 48. Error Handling

Admin operations should display clear states:

```text
Uploading...
Saving...
Published successfully
Failed to save
Retry
```

Server-side errors should be logged without exposing sensitive details to users.

---

## 49. Admin UX

Recommended dashboard:

```text
Dashboard
│
├── Total Posts
├── Published Posts
├── Drafts
├── Books
├── Videos
└── Recent Activity
```

Posts table:

```text
Title
Status
Published Date
Updated Date
Actions
```

Actions:

```text
Edit
Preview
Publish
Unpublish
Archive
```

---

## 50. Responsive Design

The public site and admin panel should support:

- Mobile.
- Tablet.
- Desktop.

Priority:

- Readability.
- Large article typography.
- Comfortable line height.
- Responsive media.
- Accessible navigation.

---

## 51. Accessibility

Use:

- Semantic HTML.
- Keyboard-friendly controls.
- Form labels.
- Alt text.
- Sufficient contrast.
- Focus states.
- ARIA only where necessary.

---

## 52. Performance Targets

Target:

- Fast initial page load.
- Optimized images.
- Cached content.
- Minimal client JavaScript on public pages.
- Server-render article pages when appropriate.

Use Next.js Server Components where they improve performance.

---

## 53. Security Checklist

Before production:

- [ ] No AWS credentials in browser code.
- [ ] S3 public access reviewed.
- [ ] IAM uses least privilege.
- [ ] Admin routes protected.
- [ ] Login rate limiting enabled.
- [ ] Passwords hashed.
- [ ] Session cookies secure and HTTP-only.
- [ ] Rich text sanitized.
- [ ] Upload MIME type validated.
- [ ] Upload size limits configured.
- [ ] Environment secrets excluded from Git.
- [ ] CSRF protections considered.
- [ ] Security headers configured.
- [ ] S3 versioning enabled.
- [ ] AWS billing alerts enabled.

---

## 54. Suggested Development Phases

### Phase 1 — Foundation

- Create Next.js project.
- Configure TypeScript.
- Configure Tailwind.
- Build base layout.
- Header/footer.
- Responsive navigation.

### Phase 2 — Public Pages

- Home.
- About.
- Posts listing.
- Post detail.
- Books.
- Videos.
- Podcast.
- Contact.

### Phase 3 — S3 Integration

- AWS client setup.
- Read content.
- Write content.
- Index handling.
- Image upload.
- Presigned URL support.

### Phase 4 — Authentication

- Admin login.
- Protected admin routes.
- Secure sessions.

### Phase 5 — Admin CMS

- Dashboard.
- Post listing.
- Create post.
- Edit post.
- Draft/publish.
- Image uploads.
- Book/video/podcast management.

### Phase 6 — SEO

- Metadata.
- Open Graph.
- Sitemap.
- robots.txt.
- Structured data.
- RSS.

### Phase 7 — Optimization

- Cache strategy.
- Revalidation.
- Image optimization.
- Error handling.
- Accessibility.
- Performance.

### Phase 8 — Production Deployment

- AWS S3 production bucket.
- IAM permissions.
- Vercel configuration.
- Environment variables.
- Domain.
- SSL.
- Budget alerts.
- Final security checks.

---

## 55. Final Recommended Architecture

```text
                         INTERNET
                            │
                            ▼
                    yourdomain.com
                            │
                            ▼
                     ┌─────────────┐
                     │   Vercel    │
                     │             │
                     │   Next.js   │
                     └──────┬──────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       Public Website                 Admin Panel
              │                           │
              │                     Authentication
              │                           │
              └─────────────┬─────────────┘
                            │
                            ▼
                    Next.js Server Layer
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
     Content Reads      Content Writes    Presigned URLs
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                            ▼
                         AWS S3
                            │
        ┌───────────────────┼────────────────────┐
        │                   │                    │
        ▼                   ▼                    ▼
     Content             Indexes              Media
        │
        ├── Posts
        ├── Books
        ├── Videos
        ├── Podcasts
        └── Pages
```

---

## 56. Final Stack Summary

| Area | Technology |
|---|---|
| Framework | Next.js |
| UI Library | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Public Hosting | Vercel |
| Content Storage | AWS S3 |
| Media Storage | AWS S3 |
| Authentication | Auth.js / secure session |
| Validation | Zod |
| Rich Text Editor | TipTap |
| Source Control | GitHub |
| Traditional Database | None in V1 |
| Separate .NET Backend | None in V1 |
| Content Redeployment | Not required |

---

## 57. Final Decision

The recommended V1 architecture is:

> **Next.js + React + TypeScript + Tailwind CSS + AWS S3 + Auth.js + Vercel + GitHub**

with:

> **No traditional database**

and:

> **No redeployment when an author creates, edits, publishes, or removes website content.**

This architecture is appropriate for a single-author or small editorial website where content volume and write frequency are moderate.

The design deliberately keeps the data-access layer abstract so a future migration to PostgreSQL, Supabase, SQL Server, a headless CMS, or another backend can be completed without redesigning the entire frontend.

