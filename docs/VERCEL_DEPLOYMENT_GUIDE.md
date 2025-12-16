# Vercel Deployment Guide

Complete guide for deploying Yuvoo to Vercel.

**Last Updated**: January 2025  
**Status**: Ready for Deployment

---

## Overview

Yuvoo is configured for deployment on Vercel with:

- **Region**: `fra1` (Frankfurt, Europe) - Optimized for Romanian users
- **Framework**: Next.js 16 (auto-detected)
- **Build Command**: `npm run buildCommand` (includes sharp rebuild for image optimization)
- **Runtime**: Node.js (latest LTS)

---

## Prerequisites

Before deploying, ensure you have:

1. ✅ **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. ✅ **GitHub/GitLab/Bitbucket Repository**: Code must be in a Git repository
3. ✅ **All Environment Variables**: See [Environment Variables](#environment-variables) section
4. ✅ **External Services Configured**:
   - Neon database created and accessible
   - Stack Auth project created
   - Brevo account created
   - OpenAI API key obtained
   - Cloudinary account created

---

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Vercel will auto-detect Next.js framework

### 2. Configure Project Settings

**Project Name**: `yuvoo` (or your preferred name)

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `./` (root of repository)

**Build Command**: `npm run buildCommand` (configured in `vercel.json`)

**Output Directory**: `.next` (default for Next.js)

**Install Command**: `npm install` (default)

**Development Command**: `npm run dev` (for preview deployments)

### 3. Set Environment Variables

Configure all required environment variables in Vercel dashboard:

**Go to**: Project Settings → Environment Variables

#### Required Environment Variables

**Database**:

```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

**Stack Auth**:

```
NEXT_PUBLIC_STACK_PROJECT_ID=your-project-id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pk_...
STACK_SECRET_SERVER_KEY=sk_...
```

**OpenAI**:

```
OPENAI_API_KEY=sk-...
```

**Cloudinary**:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Brevo (Email)**:

```
BREVO_API_KEY=your-api-key
BREVO_SENDER_EMAIL=noreply@yuvoo.ro
BREVO_SENDER_NAME=Yuvoo
```

**App URLs**:

```
NEXT_PUBLIC_APP_URL=https://yuvoo.ro
```

#### Environment Variable Configuration

For each variable:

- **Environment**: Select where it applies
  - ✅ Production
  - ✅ Preview (for pull request previews)
  - ✅ Development (optional, for Vercel CLI)

**Important**:

- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Secret keys (API keys, database passwords) should NOT have `NEXT_PUBLIC_` prefix
- Never commit `.env.local` to Git

### 4. Configure Build Settings

**Build Command**: Already configured in `vercel.json` as `npm run buildCommand`

This command:

1. Rebuilds `sharp` (required for Next.js Image optimization on Vercel)
2. Runs production build (`npm run build`)

**Node.js Version**: Vercel uses latest LTS automatically

**Region**: Configured in `vercel.json` as `fra1` (Frankfurt, Europe)

### 5. Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies
   - Run build command
   - Deploy to production
3. Monitor build logs for any errors
4. First deployment may take 5-10 minutes

### 6. Post-Deployment

#### Verify Deployment

1. **Check Build Logs**: Ensure build completed successfully
2. **Test Production URL**: Visit the generated Vercel URL
3. **Test Key Features**:
   - Homepage loads correctly
   - Authentication works (login/signup)
   - Quiz submission works
   - Database connections work
   - Email sending works

#### Run Database Migrations

After first deployment, run database migrations:

```bash
# Option 1: Via Vercel CLI
vercel env pull .env.local
npm run db:migrate

# Option 2: Via Neon Console
# Use Neon dashboard to run migrations manually
```

#### Seed Database (Optional)

For development/staging environments:

```bash
npm run db:seed
```

**Note**: Don't seed production database with test data.

---

## Configuration Files

### vercel.json

Located at project root. Contains:

- **Build settings**: Build command, output directory
- **Region**: `fra1` (Frankfurt, Europe)
- **Function timeouts**: 30 seconds for API routes
- **Security headers**: XSS protection, content type options, etc.
- **Rewrites**: Sitemap and robots.txt routes

### .vercelignore

Excludes unnecessary files from deployment:

- Development files (`.env.local`, logs)
- Documentation (`docs/`, `memory-bank/`)
- IDE files
- Test files

---

## Environment Variables Reference

### Required Variables

| Variable                                   | Description                     | Example            | Public? |
| ------------------------------------------ | ------------------------------- | ------------------ | ------- |
| `DATABASE_URL`                             | Neon Postgres connection string | `postgresql://...` | No      |
| `NEXT_PUBLIC_STACK_PROJECT_ID`             | Stack Auth project ID           | `proj_...`         | Yes     |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Stack Auth publishable key      | `pk_...`           | Yes     |
| `STACK_SECRET_SERVER_KEY`                  | Stack Auth secret key           | `sk_...`           | No      |
| `OPENAI_API_KEY`                           | OpenAI API key                  | `sk-...`           | No      |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`        | Cloudinary cloud name           | `yuvoo`            | Yes     |
| `CLOUDINARY_API_KEY`                       | Cloudinary API key              | `...`              | No      |
| `CLOUDINARY_API_SECRET`                    | Cloudinary API secret           | `...`              | No      |
| `BREVO_API_KEY`                            | Brevo email API key             | `...`              | No      |
| `BREVO_SENDER_EMAIL`                       | Verified sender email           | `noreply@yuvoo.ro` | No      |
| `BREVO_SENDER_NAME`                        | Sender display name             | `Yuvoo`            | No      |
| `NEXT_PUBLIC_APP_URL`                      | Production app URL              | `https://yuvoo.ro` | Yes     |

### Optional Variables

| Variable   | Description      | Default                           |
| ---------- | ---------------- | --------------------------------- |
| `NODE_ENV` | Node environment | `production` (auto-set by Vercel) |

---

## Domain Setup

### Custom Domain

1. **Add Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your domain (e.g., `yuvoo.ro`, `www.yuvoo.ro`)

2. **Configure DNS**:
   - Add CNAME record pointing to Vercel
   - Or use A records (Vercel provides IP addresses)
   - Follow Vercel's DNS configuration instructions

3. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - HTTPS is enabled by default

### Subdomain Setup

For staging/preview environments:

- `staging.yuvoo.ro` → Preview deployments
- `preview.yuvoo.ro` → Preview deployments

---

## Build Configuration

### Build Command

**Command**: `npm run buildCommand`

**What it does**:

1. Rebuilds `sharp` (required for Next.js Image optimization on Vercel's serverless functions)
2. Runs production build (`next build`)

**Why**: Vercel's serverless environment requires native modules like `sharp` to be rebuilt for the deployment platform.

### Build Timeouts

- **Default**: 60 seconds
- **API Routes**: 30 seconds (configured in `vercel.json`)
- **Server Actions**: 30 seconds (configured in `vercel.json`)

For long-running operations, consider:

- Background jobs via Vercel Cron
- External job queue (e.g., BullMQ, Inngest)

---

## Performance Optimization

### Image Optimization

- **Next.js Image Component**: Automatically optimizes images
- **Cloudinary CDN**: Images served via Cloudinary for better performance
- **Sharp**: Rebuilt during build for serverless compatibility

### Caching

- **Next.js Cache Components**: Configured with `"use cache"` directive
- **Static Generation**: Public pages pre-rendered at build time
- **ISR (Incremental Static Regeneration)**: Configured for dynamic content

### Edge Functions (Future)

Consider migrating API routes to Edge Functions for:

- Lower latency
- Global distribution
- Reduced cold starts

---

## Monitoring & Analytics

### Vercel Analytics (Optional)

Enable in Project Settings → Analytics:

- Web Vitals tracking
- Real User Monitoring (RUM)
- Performance insights

### Error Tracking (Recommended)

Consider integrating:

- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and error tracking
- **Vercel Logs**: Built-in logging (available in dashboard)

---

## Security

### Security Headers

Configured in `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Environment Variables

- ✅ Never commit `.env.local` to Git
- ✅ Use Vercel's environment variable management
- ✅ Rotate secrets regularly
- ✅ Use different values for production/preview

### HTTPS

- ✅ Automatically enabled by Vercel
- ✅ SSL certificates auto-provisioned
- ✅ HTTP → HTTPS redirects configured

---

## Troubleshooting

### Build Failures

**Common Issues**:

1. **Sharp Build Error**:
   - **Solution**: Ensure `buildCommand` includes `npm rebuild sharp`
   - **Check**: `vercel.json` has correct build command

2. **Environment Variable Missing**:
   - **Solution**: Verify all required variables are set in Vercel dashboard
   - **Check**: Variable names match exactly (case-sensitive)

3. **Database Connection Error**:
   - **Solution**: Verify `DATABASE_URL` is correct
   - **Check**: Database allows connections from Vercel IPs
   - **Note**: Neon allows all IPs by default

4. **TypeScript Errors**:
   - **Solution**: Fix TypeScript errors before deploying
   - **Check**: Run `npm run lint` locally

### Runtime Errors

1. **Function Timeout**:
   - **Solution**: Optimize slow operations
   - **Check**: Consider background jobs for long-running tasks

2. **Memory Issues**:
   - **Solution**: Optimize bundle size
   - **Check**: Use dynamic imports for large dependencies

3. **Cold Starts**:
   - **Solution**: Use Edge Functions for simple routes
   - **Check**: Consider keeping functions warm (Vercel Pro feature)

---

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Deployment Hooks

Configure webhooks for:

- Slack notifications
- Discord notifications
- Custom integrations

---

## Rollback

### Rollback to Previous Deployment

1. Go to Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click "..." menu → "Promote to Production"

### Emergency Rollback

If production is broken:

1. Immediately rollback via dashboard
2. Fix issues in development
3. Test thoroughly before redeploying

---

## Cost Optimization

### Vercel Pricing

- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for production use
- **Enterprise**: Custom pricing

### Optimization Tips

1. **Image Optimization**: Use Cloudinary CDN (reduces Vercel bandwidth)
2. **Caching**: Configure proper cache headers
3. **Edge Functions**: Use for simple routes (lower cost)
4. **Database**: Use Neon's free tier for development

---

## Next Steps After Deployment

1. ✅ **Verify All Features**: Test all major user flows
2. ✅ **Monitor Performance**: Check Vercel Analytics
3. ✅ **Set Up Monitoring**: Configure error tracking
4. ✅ **Set Up Alerts**: Configure deployment notifications
5. ✅ **Document Production URLs**: Save production domain
6. ✅ **Backup Strategy**: Ensure database backups are configured

---

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Status**: [vercel-status.com](https://vercel-status.com)

---

**Last Updated**: January 2025  
**Status**: Ready for Deployment
