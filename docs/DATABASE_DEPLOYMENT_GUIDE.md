# Database Deployment Guide

Complete guide for deploying Yuvoo database to Neon.

**Last Updated**: January 2025  
**Status**: Ready for Deployment

---

## Overview

Yuvoo uses **Neon** (serverless Postgres) as the database provider with:

- **ORM**: Drizzle ORM for type-safe database operations
- **Connection**: Serverless Postgres with WebSocket support
- **Migrations**: Drizzle Kit for schema versioning
- **Region**: Optimized for European users (Frankfurt region recommended)

---

## Prerequisites

Before deploying the database, ensure you have:

1. ✅ **Neon Account**: Sign up at [neon.tech](https://neon.tech)
2. ✅ **Project Access**: Access to create projects and databases
3. ✅ **Environment Variables**: `DATABASE_URL` ready for configuration
4. ✅ **Local Setup**: Database schema tested locally

---

## Deployment Steps

### 1. Create Neon Database

#### Step 1.1: Create Neon Project

1. Go to [Neon Console](https://console.neon.tech)
2. Click **"Create Project"**
3. Configure project:
   - **Project Name**: `yuvoo` (or your preferred name)
   - **Region**: `Frankfurt (eu-central-1)` (recommended for Romanian users)
   - **PostgreSQL Version**: `16` (latest stable)
   - **Compute Size**: Start with `Free` tier (can upgrade later)

4. Click **"Create Project"**

#### Step 1.2: Get Connection String

1. After project creation, Neon will display the connection string
2. **Format**: `postgresql://user:password@host/dbname?sslmode=require`
3. **Copy the connection string** - you'll need it for environment variables

**Important**:

- Neon provides multiple connection strings:
  - **Pooled connection** (recommended for serverless): `postgresql://...?sslmode=require&pgbouncer=true`
  - **Direct connection** (for migrations): `postgresql://...?sslmode=require`
- Use **pooled connection** for production (Vercel serverless functions)
- Use **direct connection** for migrations and local development

#### Step 1.3: Configure Database Settings

**Recommended Settings**:

- **Auto-suspend**: Enabled (saves costs on free tier)
- **Auto-suspend delay**: 5 minutes (default)
- **Compute size**: Start with Free tier, upgrade as needed
- **Backup retention**: 7 days (default on paid plans)

---

### 2. Connection Setup

#### Step 2.1: Local Environment Variables

1. **Create `.env.local`** (if not exists):

   ```bash
   cp .env.local.example .env.local
   ```

2. **Add DATABASE_URL**:

   ```bash
   # For local development (use direct connection)
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   ```

3. **Test Connection**:

   ```bash
   npx tsx src/lib/db/test-connection.ts
   ```

   Expected output:

   ```
   ✅ Database connection successful!
   Current database time: 2025-01-XX XX:XX:XX
   ```

#### Step 2.2: Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. **Add DATABASE_URL**:
   - **Name**: `DATABASE_URL`
   - **Value**: Use **pooled connection** from Neon (with `pgbouncer=true`)
   - **Environment**:
     - ✅ Production
     - ✅ Preview
     - ✅ Development (optional)

3. **Format for Vercel**:
   ```
   postgresql://user:password@host/dbname?sslmode=require&pgbouncer=true
   ```

**Why Pooled Connection?**

- Vercel uses serverless functions
- Pooled connections handle connection limits better
- Reduces cold start times
- Better for high-traffic applications

#### Step 2.3: Verify Connection Configuration

**Drizzle Configuration** (`drizzle.config.ts`):

```typescript
export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
```

**Database Connection** (`src/lib/db/index.ts`):

- Uses `@neondatabase/serverless` with WebSocket support
- Configured for serverless environments
- Connection pooling handled by Neon

---

### 3. Migration Deployment

#### Step 3.1: Generate Migrations (Local)

**Before deploying**, ensure migrations are up to date:

```bash
# Generate migrations from schema changes
npm run db:generate
```

This will:

1. Compare current schema (`src/lib/db/schema.ts`) with database
2. Generate migration files in `./drizzle/` directory
3. Create SQL migration files for schema changes

**Migration Files Location**: `./drizzle/`

#### Step 3.2: Review Migrations

**Check generated migrations**:

```bash
ls -la drizzle/
```

**Review migration files** to ensure they're correct:

- Check for any destructive operations (DROP TABLE, etc.)
- Verify indexes are created
- Ensure foreign keys are correct

#### Step 3.3: Run Migrations (Production)

**Option 1: Via Drizzle Kit (Recommended)**

```bash
# Set production DATABASE_URL
export DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Run migrations
npm run db:migrate
```

**Option 2: Via Neon Console**

1. Go to **Neon Console** → Your Project → **SQL Editor**
2. Copy migration SQL from `drizzle/` files
3. Paste and execute in SQL Editor
4. **Note**: Run migrations in order (check migration file names)

**Option 3: Via Vercel Build (Automated)**

For automated migrations during deployment:

1. **Create migration script** (`scripts/migrate.sh`):

   ```bash
   #!/bin/bash
   set -e
   echo "Running database migrations..."
   npm run db:migrate
   echo "Migrations completed successfully!"
   ```

2. **Add to `package.json`**:

   ```json
   {
     "scripts": {
       "postbuild": "npm run db:migrate"
     }
   }
   ```

3. **Note**: This runs migrations on every deployment. Use with caution.

**Recommended Approach**: Run migrations manually before deployment for better control.

#### Step 3.4: Verify Migrations

**Check migration status**:

```bash
npm run db:check
```

**Verify tables created**:

```bash
# Open Drizzle Studio
npm run db:studio
```

Or use Neon Console SQL Editor:

```sql
-- List all tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Check specific table structure
\d users
\d clubs
\d doctors
\d bookings
```

---

### 4. Seed Data Deployment

#### Step 4.1: Understand Seed Data

**Seed script location**: `src/lib/db/seed.ts`

**What it creates**:

- **Test users**: 3 parent accounts (for development/testing)
- **Sample clubs**: 60+ sports clubs across Romania
- **Sample doctors**: 18 pediatric specialists
- **Sports reference data**: For future sports table

**Important**:

- Seed data is **idempotent** (safe to run multiple times)
- Existing records are skipped based on unique constraints
- **DO NOT run seed in production** with real user data

#### Step 4.2: Seed Development/Staging Database

**For development or staging environments**:

```bash
# Set DATABASE_URL for target environment
export DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Run seed script
npm run db:seed
```

**Expected output**:

```
🌱 Seeding database...
✅ Sports data seeded
✅ Test users created
✅ Sample clubs created (60+ clubs)
✅ Sample doctors created (18 doctors)
✅ Database seeding completed!
```

#### Step 4.3: Verify Seed Data

**Check seeded data**:

```bash
# Open Drizzle Studio
npm run db:studio
```

Or use SQL queries:

```sql
-- Count users
SELECT COUNT(*) FROM users;

-- Count clubs
SELECT COUNT(*) FROM clubs;

-- Count doctors
SELECT COUNT(*) FROM doctors;

-- View sample club
SELECT name, city, sport_type FROM clubs LIMIT 5;
```

#### Step 4.4: Production Seed Data

**⚠️ IMPORTANT**: Do NOT run seed script in production with test data.

**For production**:

1. **Manual data entry**: Add real clubs and doctors via admin interface
2. **Data import**: Use CSV import or admin tools
3. **API integration**: Import from external sources

**Seed script is for development/staging only**.

---

## Database Schema Overview

### Tables

| Table                 | Description                                        | Key Features                                         |
| --------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| `users`               | All user types (parent, club_admin, doctor, admin) | UUID primary key, role enum, Stack Auth sync         |
| `children`            | Child profiles linked to parents                   | UUID primary key, foreign key to users               |
| `quizzes`             | Quiz answers and AI recommendations                | JSONB for answers, JSONB for recommendations         |
| `clubs`               | Sports club information                            | Slug for SEO, location data, verification status     |
| `doctors`             | Pediatric specialist profiles                      | Slug for SEO, specialties array, verification status |
| `bookings`            | Club trials and doctor consultations               | Status enum, foreign keys to children/clubs/doctors  |
| `favorites`           | Saved clubs and doctors                            | Composite unique constraint                          |
| `reviews`             | Club and doctor reviews                            | Moderation status, rating system                     |
| `onboarding_progress` | User onboarding tracking                           | Step tracking, completion status                     |

### Key Features

- **UUID Primary Keys**: All tables use UUID for IDs
- **JSONB Columns**: Flexible data storage (quiz answers, recommendations, schedules)
- **Enums**: Type-safe enums (user roles, booking status, review status)
- **Timestamps**: Automatic `created_at` and `updated_at` tracking
- **Foreign Keys**: Referential integrity with cascade options
- **Indexes**: Strategic indexing for performance (slugs, foreign keys, search fields)

---

## Connection Management

### Connection Pooling

**Neon Pooled Connections**:

- Use `pgbouncer=true` in connection string
- Recommended for serverless (Vercel)
- Handles connection limits automatically
- Reduces cold start times

**Direct Connections**:

- Use for migrations and local development
- Full PostgreSQL features
- Better for long-running operations

### Connection Limits

**Neon Free Tier**:

- **Max connections**: 100 (pooled)
- **Compute size**: 0.5 vCPU, 1 GB RAM
- **Storage**: 3 GB (expandable)

**Neon Paid Plans**:

- Higher connection limits
- More compute resources
- Better performance

### Connection String Formats

**Pooled (Production)**:

```
postgresql://user:password@host/dbname?sslmode=require&pgbouncer=true
```

**Direct (Migrations)**:

```
postgresql://user:password@host/dbname?sslmode=require
```

---

## Backup & Recovery

### Automatic Backups

**Neon Free Tier**:

- **Point-in-time recovery**: 7 days
- **Automatic backups**: Daily

**Neon Paid Plans**:

- Longer retention periods
- More frequent backups
- Custom backup schedules

### Manual Backups

**Export database**:

```bash
# Using pg_dump (via Neon CLI or local PostgreSQL)
pg_dump $DATABASE_URL > backup.sql
```

**Restore database**:

```bash
# Restore from backup
psql $DATABASE_URL < backup.sql
```

### Branching (Development)

**Neon Branching**:

- Create database branches for development
- Test migrations on branches
- Merge branches when ready

**Use Cases**:

- Testing schema changes
- Development environments
- Feature branches

---

## Performance Optimization

### Indexes

**Existing Indexes** (defined in schema):

- Slug indexes (clubs, doctors)
- Foreign key indexes
- Search field indexes

**Monitor Performance**:

```sql
-- Check slow queries
SELECT * FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Check index usage
SELECT * FROM pg_stat_user_indexes;
```

### Query Optimization

**Best Practices**:

- Use Drizzle ORM for type-safe queries
- Leverage indexes for search operations
- Use JSONB efficiently for flexible data
- Monitor query performance in Neon dashboard

### Connection Optimization

**Serverless Best Practices**:

- Use connection pooling (pgbouncer)
- Keep connections short-lived
- Use prepared statements
- Monitor connection usage

---

## Security

### Connection Security

- ✅ **SSL Required**: `sslmode=require` in connection string
- ✅ **Encrypted Connections**: All connections encrypted
- ✅ **IP Restrictions**: Configure in Neon dashboard (optional)

### Database Security

- ✅ **Strong Passwords**: Use Neon-generated passwords
- ✅ **Role-Based Access**: Use different users for different purposes
- ✅ **Environment Variables**: Never commit `DATABASE_URL` to Git
- ✅ **Secrets Management**: Use Vercel environment variables

### Data Protection

- ✅ **GDPR Compliance**: Data retention policies
- ✅ **Backup Encryption**: Automatic in Neon
- ✅ **Access Logging**: Available in Neon dashboard

---

## Monitoring & Maintenance

### Neon Dashboard

**Monitor**:

- Connection usage
- Query performance
- Storage usage
- Compute usage
- Error logs

### Drizzle Studio

**Local Development**:

```bash
npm run db:studio
```

Opens GUI at `http://localhost:4983` for:

- Viewing tables and data
- Running queries
- Inspecting schema

### Health Checks

**Connection Test**:

```bash
npx tsx src/lib/db/test-connection.ts
```

**Schema Check**:

```bash
npm run db:check
```

---

## Troubleshooting

### Connection Issues

**Problem**: Cannot connect to database

**Solutions**:

1. Verify `DATABASE_URL` is correct
2. Check Neon console for database status
3. Ensure connection string includes `?sslmode=require`
4. Test connection with `npx tsx src/lib/db/test-connection.ts`
5. Check IP restrictions in Neon dashboard

### Migration Issues

**Problem**: Migrations fail

**Solutions**:

1. Check `drizzle.config.ts` configuration
2. Verify schema file path is correct
3. Ensure database is accessible
4. Check Drizzle Kit version compatibility
5. Review migration SQL for errors
6. Run migrations in order

### Performance Issues

**Problem**: Slow queries

**Solutions**:

1. Check indexes are created
2. Monitor query performance in Neon dashboard
3. Optimize queries (use EXPLAIN ANALYZE)
4. Consider upgrading compute size
5. Use connection pooling

### Seed Data Issues

**Problem**: Seed script fails

**Solutions**:

1. Check database connection
2. Verify tables exist (run migrations first)
3. Check for duplicate data (seed is idempotent)
4. Review seed data files for errors
5. Check unique constraints

---

## Deployment Checklist

### Pre-Deployment

- [ ] Neon database created
- [ ] Connection string obtained
- [ ] Local connection tested
- [ ] Migrations generated and reviewed
- [ ] Schema verified

### Deployment

- [ ] `DATABASE_URL` set in Vercel (pooled connection)
- [ ] Migrations run successfully
- [ ] Tables created and verified
- [ ] Indexes created
- [ ] Foreign keys verified

### Post-Deployment

- [ ] Connection tested in production
- [ ] Sample queries work
- [ ] Performance acceptable
- [ ] Monitoring configured
- [ ] Backup strategy in place

### Seed Data (Development/Staging Only)

- [ ] Seed script tested locally
- [ ] Seed data appropriate for environment
- [ ] Seed script run successfully
- [ ] Data verified

---

## Next Steps After Deployment

1. ✅ **Monitor Performance**: Check Neon dashboard regularly
2. ✅ **Set Up Alerts**: Configure Neon alerts for issues
3. ✅ **Backup Strategy**: Verify automatic backups are working
4. ✅ **Documentation**: Update team documentation with connection details
5. ✅ **Access Control**: Configure user roles and permissions
6. ✅ **Optimization**: Monitor and optimize slow queries

---

## Support Resources

- **Neon Documentation**: [neon.tech/docs](https://neon.tech/docs)
- **Drizzle ORM**: [orm.drizzle.team](https://orm.drizzle.team)
- **PostgreSQL Docs**: [postgresql.org/docs](https://www.postgresql.org/docs)
- **Neon Status**: [status.neon.tech](https://status.neon.tech)

---

**Last Updated**: January 2025  
**Status**: Ready for Deployment
