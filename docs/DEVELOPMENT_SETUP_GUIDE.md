# Development Environment Setup Guide

Complete guide for setting up the Yuvoo development environment from scratch.

## Prerequisites

- **Node.js**: v20+ (recommended: v20.x or v22.x LTS)
- **Package Manager**: npm (comes with Node.js), yarn, or pnpm
- **Git**: Version control
- **Code Editor**: VS Code recommended (with extensions: ESLint, Prettier, TypeScript)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd yuvoo-nextjs

# Install dependencies
npm install
```

## Step 2: Environment Variables Configuration

### 2.1 Create Environment File

**Option 1: Use Setup Script (Recommended)**

```bash
npm run setup:dev
```

This interactive script will:

- Create `.env.local` from `.env.local.example`
- Guide you through configuring each service
- Provide links to service dashboards

**Option 2: Manual Setup**

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

### 2.2 Configure Required Services

Edit `.env.local` and configure the following services:

#### Database (Neon Postgres) - **REQUIRED**

1. **Create Neon Account**:
   - Go to [Neon Console](https://console.neon.tech)
   - Sign up for a free account
   - Create a new project (e.g., "yuvoo-dev")
   - Select region: **Frankfurt (eu-central-1)** recommended for Romanian users

2. **Get Connection String**:
   - In Neon dashboard, go to your project
   - Click "Connection Details"
   - Copy the connection string (format: `postgresql://user:password@host:5432/dbname?sslmode=require`)

3. **Add to `.env.local`**:

   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/yuvoo?sslmode=require"
   ```

4. **Test Connection**:

   ```bash
   npx tsx src/lib/db/test-connection.ts
   ```

5. **Initialize Database**:

   ```bash
   # Push schema to database
   npm run db:push

   # (Optional) Seed with sample data
   npm run db:seed
   ```

#### Authentication (Stack Auth) - **REQUIRED**

**Option 1: Automated Setup (Recommended)**

```bash
# Run automated authentication setup script
npm run setup:auth
```

This script will:

- Verify Stack Auth environment variables are configured
- Test Stack Auth configuration
- Provide next steps for testing

**Option 2: Manual Setup**

1. **Create Stack Auth Project**:
   - Go to [Stack Auth Dashboard](https://stack-auth.com/dashboard)
   - Sign up for a free account
   - Create a new project (e.g., "yuvoo-dev")
   - Copy the following values:
     - Project ID
     - Publishable Client Key (starts with `pk_`)
     - Secret Server Key (starts with `sk_`)

2. **Configure Redirect URLs**:
   - In Stack Auth dashboard, go to "Settings" → "Redirect URLs"
   - Add:
     - `http://localhost:3000` (development)
     - `http://localhost:3000/auth/callback` (development callback)
     - Your production domain (when ready)

3. **Add to `.env.local`**:

   ```bash
   NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pk_..."
   STACK_SECRET_SERVER_KEY="sk_..."
   ```

4. **Test Configuration**:
   ```bash
   npx tsx src/lib/auth/test-auth.ts
   ```

#### OpenAI API - **REQUIRED** (for Quiz AI recommendations)

1. **Create OpenAI Account**:
   - Go to [OpenAI Platform](https://platform.openai.com)
   - Sign up for an account
   - Navigate to "API Keys"
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Add to `.env.local`**:

   ```bash
   OPENAI_API_KEY="sk-..."
   ```

3. **Note**: OpenAI API usage incurs costs. Monitor usage in the OpenAI dashboard.

#### Cloudinary - **REQUIRED** (for image/document uploads)

1. **Create Cloudinary Account**:
   - Go to [Cloudinary Console](https://console.cloudinary.com)
   - Sign up for a free account
   - After signup, you'll see your dashboard with:
     - Cloud Name
     - API Key
     - API Secret

2. **Add to `.env.local`**:

   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

3. **Configure Upload Presets** (Optional):
   - Go to "Settings" → "Upload" → "Upload presets"
   - Create presets for different upload types (clubs, doctors, documents)

#### Brevo (Email Service) - **REQUIRED** (for transactional emails)

1. **Create Brevo Account**:
   - Go to [Brevo (formerly Sendinblue)](https://www.brevo.com)
   - Sign up for a free account (300 emails/day free tier)
   - Navigate to "Settings" → "API Keys"
   - Create a new API key (v3 API key)
   - Copy the key

2. **Configure Sender**:
   - Go to "Settings" → "Senders"
   - Add a sender email (e.g., `noreply@yuvoo.com`)
   - Verify the sender email address

3. **Add to `.env.local`**:
   ```bash
   BREVO_API_KEY="your-api-key"
   BREVO_SENDER_EMAIL="noreply@yuvoo.com"
   BREVO_SENDER_NAME="Yuvoo"
   ```

#### App URLs - **REQUIRED**

Add your application URLs:

```bash
# Development
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Production (update when deploying)
# NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### 2.3 Complete Environment File

Your `.env.local` should look like this:

```bash
# Database (Neon Postgres)
DATABASE_URL="postgresql://user:password@host:5432/yuvoo?sslmode=require"

# Authentication (Stack Auth)
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pk_..."
STACK_SECRET_SERVER_KEY="sk_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Brevo (Email)
BREVO_API_KEY="your-api-key"
BREVO_SENDER_EMAIL="noreply@yuvoo.com"
BREVO_SENDER_NAME="Yuvoo"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Step 3: Initialize Database

**Option 1: Automated Setup (Recommended)**

```bash
# Run automated database setup script
npm run setup:db
```

This script will:

- Test database connection
- Push schema to database
- Verify setup completion

**Option 2: Manual Setup**

```bash
# Push schema to database
npm run db:push

# (Optional) Seed with sample data
npm run db:seed

# Open Drizzle Studio to view database
npm run db:studio
```

## Step 4: Verify Setup

### 4.1 Test Database Connection

```bash
npx tsx src/lib/db/test-connection.ts
```

Expected output:

```
✅ Database connection successful!
✅ Schema loaded successfully
```

### 4.2 Test Stack Auth Configuration

```bash
npx tsx src/lib/auth/test-auth.ts
```

Expected output:

```
✅ Stack Auth configuration valid
✅ Project ID: your-project-id
```

### 4.3 Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Verify Features

### 5.1 Authentication Flow

1. Navigate to `/auth/register`
2. Create a test account
3. Verify email confirmation flow
4. Test login at `/auth/login`

### 5.2 Database Operations

1. Open Drizzle Studio: `npm run db:studio`
2. Verify tables are created
3. Check if seed data is present (if you ran `npm run db:seed`)

### 5.3 Quiz System

1. Navigate to `/chestionar`
2. Complete a test quiz
3. Verify AI recommendations are generated

### 5.4 Image Uploads

1. Try uploading an image in club/doctor onboarding
2. Verify image appears in Cloudinary dashboard

### 5.5 Email Sending

1. Complete a booking
2. Check email inbox for confirmation email
3. Verify email appears in Brevo dashboard

## Troubleshooting

### Database Connection Issues

**Error**: `Connection refused` or `Connection timeout`

**Solutions**:

- Verify `DATABASE_URL` is correct
- Check if Neon database is active (not paused)
- Verify network connection
- Try using pooled connection string from Neon dashboard

### Stack Auth Issues

**Error**: `Invalid project ID` or authentication fails

**Solutions**:

- Verify all three Stack Auth keys are correct
- Check redirect URLs in Stack Auth dashboard
- Ensure keys are not expired
- Verify `NEXT_PUBLIC_` prefix on public keys

### OpenAI API Issues

**Error**: `Invalid API key` or rate limit errors

**Solutions**:

- Verify API key is correct (starts with `sk-`)
- Check OpenAI account has credits
- Monitor usage in OpenAI dashboard
- Check rate limits in OpenAI dashboard

### Cloudinary Issues

**Error**: `Invalid cloud name` or upload fails

**Solutions**:

- Verify cloud name, API key, and secret are correct
- Check Cloudinary account is active
- Verify upload presets are configured (if using)
- Check file size limits (free tier: 10MB per file)

### Brevo Email Issues

**Error**: `Invalid API key` or emails not sending

**Solutions**:

- Verify API key is correct (v3 API key)
- Check sender email is verified in Brevo dashboard
- Verify daily email limit (free tier: 300/day)
- Check email logs in Brevo dashboard

## Next Steps

After completing setup:

1. **Read Documentation**:
   - `CLAUDE.md` - Comprehensive project guide
   - `docs/ARCHITECTURE_OVERVIEW.md` - System architecture
   - `docs/BRAND_GUIDELINES.md` - Design and UX guidelines

2. **Explore Codebase**:
   - Review `src/lib/routes.ts` for all routes
   - Check `src/modules/` for business logic
   - Explore `src/components/features/` for UI components

3. **Start Development**:
   - Pick a feature from `docs/TODO_RESOLUTION_PLAN.md`
   - Follow patterns in existing code
   - Use `@/lib/routes` for navigation
   - All user-facing text must be in Romanian

## Quick Reference

### Essential Commands

```bash
# Setup
npm run setup:dev        # Interactive setup script
npm run setup:db        # Automated database setup
npm run setup:auth      # Automated authentication setup
npm run verify:setup    # Verify environment configuration

# Development
npm run dev             # Start dev server
npm run build           # Production build
npm run lint            # Check code quality

# Database
npm run db:push         # Push schema changes
npm run db:studio       # Open database GUI
npm run db:seed         # Seed sample data
npm run db:generate     # Generate migrations
npm run db:migrate      # Run migrations

# Testing
npx tsx src/lib/db/test-connection.ts      # Test database
npx tsx src/lib/auth/test-auth.ts          # Test Stack Auth
```

### Environment Variables Checklist

- [ ] `DATABASE_URL` - Neon Postgres connection string
- [ ] `NEXT_PUBLIC_STACK_PROJECT_ID` - Stack Auth project ID
- [ ] `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` - Stack Auth publishable key
- [ ] `STACK_SECRET_SERVER_KEY` - Stack Auth secret key
- [ ] `OPENAI_API_KEY` - OpenAI API key
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` - Cloudinary API secret
- [ ] `BREVO_API_KEY` - Brevo API key
- [ ] `BREVO_SENDER_EMAIL` - Brevo sender email
- [ ] `BREVO_SENDER_NAME` - Brevo sender name
- [ ] `NEXT_PUBLIC_APP_URL` - Application URL

## Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review service-specific documentation:
   - [Neon Docs](https://neon.tech/docs)
   - [Stack Auth Docs](https://docs.stack-auth.com)
   - [OpenAI Docs](https://platform.openai.com/docs)
   - [Cloudinary Docs](https://cloudinary.com/documentation)
   - [Brevo Docs](https://developers.brevo.com)
3. Check project documentation in `docs/` directory
4. Review `memory-bank/` for project context

---

**Last Updated**: January 2025  
**Status**: Complete setup guide for development environment
