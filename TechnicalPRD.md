 # PT. Jogja Creative Production — Technical PRD (AI Agent)

## Technology Stack

| Category | Technology | Purpose |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR, SEO, RSC |
| UI | React 19 | Frontend |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS v4 | Styling |
| Components | shadcn/ui | Accessible UI |
| Animation | Framer Motion + GSAP | Motion & storytelling |
| Icons | Lucide React | Icons |
| Forms | React Hook Form + Zod | Forms & validation |
| State | Zustand | Global state |
| Data Fetching | TanStack Query | Server state |
| Backend | Next.js API Routes | Backend |
| Database | PostgreSQL (Supabase) | Persistence |
| ORM | Drizzle ORM | Type-safe database access |
| Storage | Supabase Storage | Media |
| Authentication | Supabase Auth | Authentication |
| Email | Resend | Transactional email |
| Analytics | GA4, Microsoft Clarity, Meta Pixel | Analytics |
| Monitoring | Sentry | Error tracking |
| Deployment | Vercel + Cloudflare | Hosting & CDN |
| Package Manager | pnpm | Dependencies |

## Architecture

```text
Browser
   │
Cloudflare CDN
   │
Next.js 15 (App Router)
   ├── React Frontend
   └── API Routes
          │
     Business Logic
          │
      Drizzle ORM
          │
 PostgreSQL (Supabase)
          │
 Supabase Storage
```

## Content Management

Content will be managed directly through Supabase tables and Supabase Storage. No custom admin dashboard will be developed. Static company information can be maintained through source files, while dynamic content (portfolio, blog, careers, testimonials, and inquiries) is accessed via Supabase.

## Project Structure

```text
src/
├── app/
├── components/
├── features/
│   ├── home/
│   ├── about/
│   ├── services/
│   ├── portfolio/
│   ├── blog/
│   ├── career/
│   ├── contact/
│   ├── auth/
│   └── dashboard/
├── shared/
├── hooks/
├── lib/
├── services/
├── repositories/
├── providers/
├── types/
├── constants/
├── styles/
└── middleware.ts
```

## Design System

### Color Tokens

- Primary: Emerald 600
- Secondary: Slate 900
- Background: White
- Surface: Gray 50
- Text Primary: Gray 900
- Text Secondary: Gray 500
- Success: Green
- Warning: Amber
- Danger: Red
- Border: Gray 200

### Typography

- Display: Geist
- Heading: Geist
- Body: Inter
- Caption: Inter

### Spacing

8-point spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

### Radius

- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px

### Motion

**GSAP**
- Hero reveal
- Scroll storytelling
- Horizontal gallery
- Sticky sections

**Framer Motion**
- Buttons
- Cards
- Modal
- Hover states
- Page transitions

## SEO

- Server-side rendering
- Metadata API
- Schema.org
- Open Graph
- Twitter Card
- XML Sitemap
- robots.txt
- Canonical URL
- Dynamic metadata
- Breadcrumb schema

## Analytics

- Google Analytics 4
- Microsoft Clarity
- Meta Pixel
- Custom conversion events

## Page Specifications

### Home
- Hero section
- Company overview
- Featured services
- Featured portfolio
- Client logos
- Testimonials
- CTA

### About
- Company profile
- Vision & mission
- Timeline
- Team
- Core values

### Services
- Service listing
- Detail page
- Workflow
- Benefits
- FAQ
- CTA

### Portfolio
- Filter by category
- Project detail
- Gallery
- Video
- Client information

### Blog
- Article list
- Categories
- Search
- Related articles

### Career
- Open positions
- Benefits
- Culture
- Application form

### Contact
- Contact form
- Office information
- Google Maps
- Social media
- FAQ


## Clean Architecture

```text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
```

Business logic must remain independent from UI and infrastructure. Repository pattern should be used for database access, and each feature should be isolated within its own module.
