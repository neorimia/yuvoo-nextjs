# Yuvoo - SEO Guidelines

## Overview

This document provides comprehensive SEO guidelines for the Yuvoo platform, including slug generation, meta tags, Open Graph templates, and SEO best practices.

**Purpose**: Ensure all pages are SEO-friendly and optimized for Romanian search engines, particularly Google.

**Key Principle**: Public routes use Romanian language for SEO optimization, internal routes use English (not SEO-sensitive).

---

## SEO Strategy

### Target Market

- **Primary Market**: Romania
- **Primary Language**: Romanian
- **Primary City**: Bucharest (Phase 1)
- **Target Audience**: Parents with children aged 4-14

### SEO Goals

1. **Local SEO**: Rank for Bucharest-specific searches
2. **Long-tail Keywords**: Target specific queries like "cluburi sport copii bucuresti"
3. **Brand Awareness**: Build Yuvoo brand recognition
4. **Trust Signals**: Highlight verification badges, specialists, safety

### Keyword Strategy

**Primary Keywords**:

- "sport copii bucuresti"
- "cluburi sport copii"
- "sport potrivit copil"
- "cluburi verificate copii"
- "specialist pediatru sport"

**Long-tail Keywords**:

- "ce sport i se potriveste copilului"
- "cluburi fotbal copii bucuresti"
- "cluburi baschet copii romania"
- "specialist ortopedie pediatrica bucuresti"

---

## URL Structure & Slug Generation

### SEO-Friendly Route Structure

**Public Routes** (Romanian, indexed by search engines):

```
/sporturi                    → Sports listing
/sporturi/[slug]             → Sport detail page
/cluburi                     → Clubs listing
/cluburi/[slug]              → Club detail page
/cluburi/categorie/[category] → Club category page
/cluburi/[slug]/recenzii     → Club reviews page
/doctori                     → Doctors listing
/doctori/[slug]              → Doctor detail page
/chestionar                  → Quiz intro page
/chestionar/container        → Quiz container
/chestionar/previzualizare   → Quiz preview
/chestionar/rezultate        → Quiz results
/despre-noi                  → About page
/parteneri                   → Partners page
/intrebari-frecvente         → FAQ page
/contact                     → Contact page
/ajutor                      → Help page
/confidentialitate           → Privacy policy
/termeni                     → Terms of service
/cookies                     → Cookie policy
/gdpr-parinti                → GDPR for parents
/cautare                     → Search page
```

**Internal Routes** (English, not SEO-sensitive):

```
/auth/login                  → Login page
/auth/register               → Register page
/parent/dashboard            → Parent dashboard
/parent/children             → Children list
/club/dashboard              → Club dashboard
/doctor/dashboard            → Doctor dashboard
/admin/dashboard             → Admin dashboard
```

### Slug Generation Rules

#### Club Slugs

**Format**: `[sport]-[location]-[identifier]`

**Examples**:

- `fotbal-club-bucuresti-sector-1`
- `baschet-academia-bucuresti`
- `tenis-copii-otopeni`
- `inot-copii-bucuresti`

**Rules**:

1. Use lowercase
2. Replace spaces with hyphens
3. Use Romanian diacritics (ă, â, î, ș, ț) - keep them in slugs
4. Include sport type
5. Include location (city/district)
6. Add unique identifier if needed
7. Keep slugs descriptive but concise (max 60 characters)

**Implementation**:

```typescript
function generateClubSlug(name: string, sport: string, city: string, district?: string): string {
  const base = `${sport}-${name.toLowerCase()}-${city}`;
  const withDistrict = district ? `${base}-${district}` : base;
  return withDistrict
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics for URL
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
```

#### Doctor Slugs

**Format**: `[specialty]-[name]-[location]`

**Examples**:

- `ortopedie-pediatrica-dr-ionescu-bucuresti`
- `nutritie-copii-dr-popescu-bucuresti`
- `psihologie-sportiva-dr-georgescu-bucuresti`

**Rules**:

1. Use lowercase
2. Include specialty in Romanian
3. Include doctor name (last name)
4. Include location
5. Keep descriptive but concise

#### Sport Slugs

**Format**: `[sport-name]`

**Examples**:

- `fotbal`
- `baschet`
- `tenis`
- `inot`
- `gimnastica`
- `dans`

**Rules**:

1. Use lowercase
2. Use Romanian sport names
3. Keep simple and direct
4. No special characters

### Slug Best Practices

**✅ DO**:

- Use descriptive, keyword-rich slugs
- Include location for local SEO
- Keep slugs concise (max 60 characters)
- Use hyphens to separate words
- Include relevant keywords naturally

**❌ DON'T**:

- Don't use special characters
- Don't use underscores or spaces
- Don't create overly long slugs
- Don't use generic identifiers (id-123)
- Don't use English in public route slugs

---

## Meta Tags Templates

### Standard Meta Tags

#### Page Title Template

**Format**: `[Page Title] | Yuvoo - [Value Proposition]`

**Examples**:

- `Cluburi Sport Copii București | Yuvoo - Descoperă sportul potrivit copilului tău`
- `Fotbal pentru Copii | Yuvoo - Cluburi Verificate și Recomandări Personalizate`
- `Chestionar AI Coach | Yuvoo - Găsește sportul potrivit în 5 minute`

**Rules**:

- Max 60 characters
- Include primary keyword
- Include brand name
- Include value proposition
- Use Romanian language

#### Meta Description Template

**Format**: `[Description of page content]. [Key benefits]. [Call to action].`

**Examples**:

- `Descoperă cluburi sport verificate pentru copii în București. Recomandări personalizate bazate pe profilul copilului tău. Începe chestionarul gratuit.`
- `Cluburi de fotbal pentru copii verificate în București. Găsește clubul potrivit pentru copilul tău cu ajutorul AI Coach. Vezi cluburile disponibile.`

**Rules**:

- Max 160 characters
- Include primary keyword naturally
- Include key benefits
- Include call to action
- Use Romanian language
- Make it compelling and clickable

### Implementation Example

```typescript
// app/cluburi/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return {
      title: "Club negăsit | Yuvoo",
      description: "Clubul căutat nu a fost găsit.",
    };
  }

  return {
    title: `${club.name} | Yuvoo - Cluburi Sport Verificate`,
    description: `${club.description?.substring(0, 120)}... Club verificat Yuvoo. Vezi programul și prețurile.`,
    keywords: [
      club.sportName,
      "cluburi sport copii",
      "bucurești",
      club.location.city,
      "cluburi verificate",
    ].join(", "),
  };
}
```

---

## Open Graph Templates

### Standard Open Graph Tags

#### OG Title Template

**Format**: `[Page Title] | Yuvoo`

**Example**: `Cluburi Sport Copii București | Yuvoo`

#### OG Description Template

**Format**: `[Page description with key benefits]`

**Example**: `Descoperă cluburi sport verificate pentru copii în București. Recomandări personalizate bazate pe profilul copilului tău.`

#### OG Image Template

**Format**: `[Page-specific image or default Yuvoo image]`

**Requirements**:

- Size: 1200x630px (recommended)
- Format: JPG or PNG
- Include Yuvoo branding
- Relevant to page content

#### OG URL Template

**Format**: `https://yuvoo.ro/[page-path]`

**Example**: `https://yuvoo.ro/cluburi/fotbal-club-bucuresti-sector-1`

### Implementation Example

```typescript
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  const ogImage = club.images?.[0] || "/assets/img/og-default.jpg";
  const ogUrl = `https://yuvoo.ro/cluburi/${slug}`;

  return {
    title: `${club.name} | Yuvoo`,
    description: club.description?.substring(0, 160),
    openGraph: {
      title: `${club.name} | Yuvoo`,
      description: club.description?.substring(0, 160),
      url: ogUrl,
      siteName: "Yuvoo",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: club.name,
        },
      ],
      locale: "ro_RO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${club.name} | Yuvoo`,
      description: club.description?.substring(0, 160),
      images: [ogImage],
    },
  };
}
```

### Open Graph Best Practices

**✅ DO**:

- Use high-quality images (1200x630px)
- Include relevant descriptions
- Use Romanian language
- Include brand name
- Test with Facebook Debugger and Twitter Card Validator

**❌ DON'T**:

- Don't use low-quality images
- Don't use generic descriptions
- Don't forget to update OG tags when content changes
- Don't use English in OG tags for public pages

---

## Structured Data (Schema.org)

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yuvoo",
  "url": "https://yuvoo.ro",
  "logo": "https://yuvoo.ro/assets/img/logo/logo.svg",
  "description": "Platformă digitală pentru descoperirea sportului potrivit copilului tău",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "București",
    "addressCountry": "RO"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@yuvoo.ro",
    "contactType": "customer service"
  }
}
```

### LocalBusiness Schema (for Clubs)

```json
{
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "[Club Name]",
  "description": "[Club Description]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Address]",
    "addressLocality": "[City]",
    "addressCountry": "RO"
  },
  "telephone": "[Phone]",
  "url": "https://yuvoo.ro/cluburi/[slug]",
  "image": "[Club Image]",
  "priceRange": "[Price Range]"
}
```

### FAQ Schema (for FAQ Page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer]"
      }
    }
  ]
}
```

---

## Content SEO Guidelines

### On-Page SEO

#### Headings Structure

**✅ DO**:

- Use H1 for main page title (one per page)
- Use H2 for main sections
- Use H3 for subsections
- Maintain proper hierarchy (H1 → H2 → H3)
- Include keywords naturally in headings

**Example**:

```html
<h1>Cluburi Sport pentru Copii în București</h1>
<h2>Găsește Clubul Potrivit pentru Copilul Tău</h2>
<h3>Cluburi Verificate Yuvoo</h3>
```

#### Content Guidelines

**✅ DO**:

- Write for users first, search engines second
- Use Romanian language throughout
- Include keywords naturally
- Provide valuable, unique content
- Use internal linking
- Include location-specific information
- Add trust signals (verification badges, specialist credentials)

**❌ DON'T**:

- Don't keyword stuff
- Don't use duplicate content
- Don't use English for public pages
- Don't create thin content
- Don't ignore user intent

### Internal Linking Strategy

**Link Structure**:

- Link from homepage to main sections
- Link from sport pages to relevant clubs
- Link from club pages to related sports
- Link from quiz results to recommended clubs
- Link from club pages to doctor pages (when relevant)

**Anchor Text**:

- Use descriptive anchor text
- Include keywords naturally
- Use Romanian language
- Make it clear where the link goes

---

## Technical SEO

### URL Structure

**✅ DO**:

- Use clean, descriptive URLs
- Use hyphens to separate words
- Keep URLs concise
- Include keywords in URLs
- Use lowercase

**❌ DON'T**:

- Don't use query parameters for important pages
- Don't use special characters
- Don't create deep URL hierarchies (>3 levels)
- Don't use session IDs in URLs

### Canonical URLs

**Implementation**:

```html
<link rel="canonical" href="https://yuvoo.ro/cluburi/[slug]" />
```

**Rules**:

- One canonical URL per page
- Use absolute URLs
- Point to the preferred version of the page

### Robots.txt

```
User-agent: *
Allow: /
Disallow: /auth/
Disallow: /parent/
Disallow: /club/
Disallow: /doctor/
Disallow: /admin/
Disallow: /api/
Sitemap: https://yuvoo.ro/sitemap.xml
```

### Sitemap Structure

**Priority Pages**:

- Homepage: 1.0
- Main category pages: 0.9
- Club/Doctor detail pages: 0.8
- Sport pages: 0.8
- Info pages: 0.7

**Update Frequency**:

- Homepage: daily
- Club/Doctor pages: weekly
- Sport pages: monthly
- Info pages: monthly

---

## Local SEO

### Google Business Profile

**For Yuvoo**:

- Create Google Business Profile
- Add location (București)
- Add business category
- Add description in Romanian
- Add website URL
- Add contact information

### Location-Specific Content

**✅ DO**:

- Include city name in titles and descriptions
- Include district/neighborhood when relevant
- Use local landmarks and references
- Include local contact information
- Create location-specific landing pages

**Examples**:

- "Cluburi Sport Copii București Sector 1"
- "Cluburi Fotbal Copii București"
- "Specialiști Pediatrie Sport București"

---

## Performance SEO

### Page Speed

**Targets**:

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1

### Image Optimization

**✅ DO**:

- Use Next.js Image component
- Optimize images (WebP format)
- Use appropriate image sizes
- Add alt text in Romanian
- Lazy load images below the fold

### Mobile Optimization

**✅ DO**:

- Ensure responsive design
- Test on mobile devices
- Optimize for mobile page speed
- Use mobile-friendly navigation
- Ensure touch targets are adequate size

---

## Google Search Console Setup

### Initial Setup

1. **Go to Google Search Console**: https://search.google.com/search-console

2. **Add Property**:
   - Click "Add property"
   - Choose "URL prefix" method
   - Enter: `https://yuvoo.ro`

3. **Verify Ownership** (recommended: HTML meta tag method):
   - Select "HTML tag" verification method
   - Copy the verification code (content value only)
   - Add to `.env.local`: `GOOGLE_SITE_VERIFICATION="your-code"`
   - Deploy and verify

4. **Submit Sitemap**:
   - Go to Sitemaps section
   - Enter: `sitemap.xml`
   - Click Submit

### Post-Setup Tasks

1. **Request Indexing**:
   - Use URL Inspection tool for key pages
   - Request indexing for: `/`, `/cluburi`, `/sporturi`, `/doctori`, `/chestionar`

2. **Monitor Coverage**:
   - Check "Coverage" report weekly
   - Fix any errors or warnings
   - Monitor "Excluded" pages (should be protected routes)

3. **Performance Monitoring**:
   - Review "Performance" report weekly
   - Track impressions, clicks, CTR, and position
   - Identify top-performing pages and queries

### Sitemap Structure

The sitemap (`/sitemap.xml`) includes:

| Category         | Priority | Change Frequency | Notes                                |
| ---------------- | -------- | ---------------- | ------------------------------------ |
| Homepage         | 1.0      | daily            | Highest priority                     |
| Core directories | 0.9      | daily/weekly     | `/cluburi`, `/sporturi`, `/doctori`  |
| AI Quiz          | 0.9      | monthly          | `/chestionar`                        |
| B2B Landing      | 0.85     | monthly          | `/pentru-cluburi`, `/pentru-doctori` |
| Detail pages     | 0.8      | weekly           | Individual club/doctor/sport pages   |
| Location pages   | 0.75     | weekly           | `/cluburi/locatie/*`                 |
| Info pages       | 0.6-0.7  | monthly          | About, FAQ, Contact, Help            |
| Legal pages      | 0.3      | yearly           | Privacy, Terms, GDPR                 |

### robots.txt Configuration

The robots.txt blocks:

- Authentication routes (`/auth/`, `/login`, `/register`)
- Protected dashboards (`/parent/`, `/club/`, `/doctor/`, `/admin/`)
- Internal flows (`/onboarding/`, quiz internals)
- API routes (`/api/`)
- Tracking paths (`/ingest/`, `/monitoring`)
- AI crawlers (GPTBot, CCBot, etc.)

---

## Monitoring & Analytics

### Key Metrics

- Organic traffic
- Keyword rankings
- Click-through rate (CTR)
- Bounce rate
- Average session duration
- Pages per session
- Conversion rate

### Tools

- Google Search Console (primary)
- Google Analytics (PostHog alternative in use)
- Bing Webmaster Tools (optional)
- SEO monitoring tools

---

## Quick Reference

### Meta Tags Template

```typescript
{
  title: '[Page Title] | Yuvoo - [Value Proposition]',
  description: '[Description with keywords]. [Benefits]. [CTA].',
  keywords: '[keyword1], [keyword2], [keyword3]',
  openGraph: {
    title: '[Page Title] | Yuvoo',
    description: '[Description]',
    url: 'https://yuvoo.ro/[path]',
    images: ['[image-url]'],
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Page Title] | Yuvoo',
    description: '[Description]',
    images: ['[image-url]'],
  },
}
```

### Slug Generation Template

```typescript
// Club slug
`${sport}-${name}-${city}-${district}`
// Doctor slug
`${specialty}-${name}-${city}`
// Sport slug
`sport-name`;
```

---

## References

- **Routes**: `src/lib/routes.ts` - All application routes
- **Architecture Overview**: `docs/ARCHITECTURE_OVERVIEW.md` - Technical architecture
- **Brand Guidelines**: `docs/BRAND_GUIDELINES.md` - Brand voice and messaging
- **System Patterns**: `memory-bank/systemPatterns.md` - Routing patterns

---

## Summary

This SEO guidelines document ensures:

- ✅ **SEO-Friendly URLs**: Romanian slugs for public routes
- ✅ **Optimized Meta Tags**: Title, description, keywords
- ✅ **Open Graph Tags**: Social media sharing optimization
- ✅ **Structured Data**: Schema.org markup
- ✅ **Local SEO**: Location-specific optimization
- ✅ **Performance**: Page speed optimization
- ✅ **Monitoring**: Analytics and tracking

**Always follow these guidelines when creating new pages to ensure optimal SEO performance for the Yuvoo platform.**
