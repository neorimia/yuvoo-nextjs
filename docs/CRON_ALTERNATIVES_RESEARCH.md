# Cron Job Alternatives for Vercel Hobby Plan

**Research Date**: January 2026  
**Current Issue**: Vercel Hobby plan has hourly precision (cron jobs can trigger anywhere within the scheduled hour window)  
**Goal**: Find alternatives that provide per-minute precision while staying on Vercel Hobby plan

---

## Current Setup

### Existing Cron Jobs

1. **Expire Leads** (`/api/cron/expire-leads`)
   - Schedule: Daily at midnight (`0 0 * * *`)
   - Purpose: Expire leads that have passed their 5-day expiration date
   - Current limitation: May run anywhere between 00:00-00:59 on Hobby plan

2. **Send Lead Reminders** (`/api/cron/send-lead-reminders`)
   - Schedule: Every hour (`0 * * * *`)
   - Purpose: Send reminder emails to clubs about pending leads (48h after creation)
   - Current limitation: May run anywhere within each hour window

### Security

Both endpoints are protected by `CRON_SECRET` environment variable:

- Expects `Authorization: Bearer <CRON_SECRET>` header
- Returns 401 Unauthorized if secret doesn't match

---

## Alternative Solutions

### 1. GitHub Actions Scheduled Workflows ⭐ **RECOMMENDED**

**Best for**: Projects already using GitHub, free tier available

#### Pros

- ✅ **Free** for public repositories (unlimited minutes)
- ✅ **Free** for private repos (2,000 minutes/month on free plan)
- ✅ **Per-minute precision** (minimum interval: 5 minutes)
- ✅ No external service dependency
- ✅ Integrated with code repository
- ✅ Execution logs and history in GitHub
- ✅ Can trigger on schedule OR on push/PR events
- ✅ Supports secrets management

#### Cons

- ❌ Requires GitHub repository (if not already using)
- ❌ Minimum interval: 5 minutes (not suitable for sub-minute jobs)
- ❌ Runs in UTC timezone (can be adjusted in workflow)
- ❌ Workflow files committed to repository (visible to all)

#### Implementation

Create `.github/workflows/cron-jobs.yml`:

```yaml
name: Cron Jobs

on:
  schedule:
    # Expire leads - Daily at midnight UTC (adjust timezone as needed)
    - cron: "0 0 * * *"
    # Send reminders - Every hour
    - cron: "0 * * * *"
  workflow_dispatch: # Allow manual triggering

jobs:
  expire-leads:
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 0 * * *' || github.event_name == 'workflow_dispatch'
    steps:
      - name: Call Expire Leads Endpoint
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json" \
            ${{ secrets.VERCEL_APP_URL }}/api/cron/expire-leads

  send-reminders:
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 * * * *' || github.event_name == 'workflow_dispatch'
    steps:
      - name: Call Send Reminders Endpoint
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json" \
            ${{ secrets.VERCEL_APP_URL }}/api/cron/send-lead-reminders
```

**Required GitHub Secrets**:

- `CRON_SECRET`: Same secret used in Vercel environment variables
- `VERCEL_APP_URL`: Your Vercel app URL (e.g., `https://yuvoo.vercel.app`)

**Cost**: Free (for public repos or within free tier limits)

---

### 2. cron-job.org ⭐ **BEST FREE OPTION**

**Best for**: Simple HTTP endpoint triggering, completely free

#### Pros

- ✅ **Completely free** (no paid tier required)
- ✅ **Per-minute precision** (up to 60 executions/hour)
- ✅ **15+ years** of operation, millions of jobs daily
- ✅ Simple HTTP request configuration
- ✅ Execution history and logs
- ✅ Status notifications (email)
- ✅ REST API available
- ✅ Open-source (GPL-licensed)

#### Cons

- ❌ External service dependency
- ❌ Requires account creation
- ❌ Free tier may have rate limits (check current limits)

#### Implementation

1. Sign up at https://cron-job.org
2. Create new cron job:
   - **URL**: `https://yuvoo.vercel.app/api/cron/expire-leads`
   - **Schedule**: `0 0 * * *` (daily at midnight)
   - **Method**: POST
   - **Headers**: `Authorization: Bearer <CRON_SECRET>`
   - **Content-Type**: `application/json`
3. Repeat for reminder job

**Cost**: Free

---

### 3. EasyCron

**Best for**: More advanced features, paid options available

#### Pros

- ✅ **Free tier**: 200 executions per day, 20-minute minimum interval
- ✅ **Paid tier**: $24/year for 8,000 executions/day, 1-minute intervals
- ✅ Email notifications
- ✅ Failure logs
- ✅ Custom HTTP headers
- ✅ Timezone support
- ✅ REST API

#### Cons

- ❌ Free tier: 20-minute minimum interval (not suitable for hourly jobs)
- ❌ Requires paid plan ($24/year) for per-minute precision
- ❌ External service dependency

#### Pricing

- **Free**: 200 EPDs, 20-minute intervals
- **Individual**: $24/year - 8,000 EPDs, 1-minute intervals
- **Professional**: $60/year - 40,000 EPDs, 1-minute intervals
- **Enterprise**: $120-$1,200/year

**Cost**: Free (limited) or $24/year (recommended)

---

### 4. CronUptime

**Best for**: Vercel-specific optimization, free tier available

#### Pros

- ✅ **Free tier**: 5 cron jobs
- ✅ **30-second timeout** (vs Vercel's 10-second Hobby limit)
- ✅ Detailed execution logs
- ✅ Built on Cloudflare (99.9%+ uptime)
- ✅ Works specifically with Vercel Hobby plan

#### Cons

- ❌ Free tier limited to 5 cron jobs
- ❌ External service dependency
- ❌ May require paid plan for production use

**Cost**: Free (5 jobs) or paid plans available

---

### 5. Render Cron Jobs

**Best for**: If already using Render for other services

#### Pros

- ✅ Per-minute precision
- ✅ Git repo integration
- ✅ Environment variable support
- ✅ Single-run guarantee (no parallel execution)

#### Cons

- ❌ **$1/month minimum** per cron job service
- ❌ Requires Render account
- ❌ External service dependency

**Cost**: $1/month per cron job ($2/month for both jobs)

---

## Comparison Table

| Solution           | Cost        | Precision  | Setup Complexity | Reliability | Best For          |
| ------------------ | ----------- | ---------- | ---------------- | ----------- | ----------------- |
| **GitHub Actions** | Free        | Per-minute | Medium           | High        | GitHub users      |
| **cron-job.org**   | Free        | Per-minute | Low              | High        | Simple needs      |
| **EasyCron**       | Free/$24/yr | 20min/1min | Low              | High        | Advanced features |
| **CronUptime**     | Free/Paid   | Per-minute | Low              | High        | Vercel users      |
| **Render**         | $1/job      | Per-minute | Medium           | High        | Render users      |
| **Vercel Cron**    | Free        | Hourly     | Low              | High        | Current setup     |

---

## Recommendations

### Option 1: GitHub Actions (Recommended) ⭐

**Why**:

- Free and reliable
- Integrated with codebase
- Per-minute precision
- No external service dependency
- Execution logs in GitHub

**When to use**: If you're already using GitHub for your repository

**Migration effort**: Low (create workflow file, add secrets)

### Option 2: cron-job.org (Best Free External)

**Why**:

- Completely free
- Per-minute precision
- Simple setup
- 15+ years of reliable operation

**When to use**: If you prefer external service or don't use GitHub

**Migration effort**: Low (sign up, configure 2 cron jobs)

### Option 3: Keep Vercel Cron (Accept Limitations)

**Why**:

- Already configured
- No migration needed
- Free
- Hourly precision may be acceptable for your use case

**When to use**: If hourly precision is acceptable (leads expire within 1-hour window is fine)

**Migration effort**: None

---

## Implementation Guide: GitHub Actions

### Step 1: Create Workflow File

Create `.github/workflows/cron-jobs.yml`:

```yaml
name: Yuvoo Cron Jobs

on:
  schedule:
    # Expire leads - Daily at midnight UTC
    # Adjust timezone: For Romania (UTC+2), use '0 22 * * *' for midnight EET
    - cron: "0 0 * * *"
    # Send reminders - Every hour
    - cron: "0 * * * *"
  workflow_dispatch: # Allow manual triggering from GitHub UI

jobs:
  expire-leads:
    name: Expire Leads
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 0 * * *' || github.event_name == 'workflow_dispatch'
    steps:
      - name: Call Expire Leads Endpoint
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json" \
            ${{ secrets.VERCEL_APP_URL }}/api/cron/expire-leads
        continue-on-error: true

  send-reminders:
    name: Send Lead Reminders
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 * * * *' || github.event_name == 'workflow_dispatch'
    steps:
      - name: Call Send Reminders Endpoint
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json" \
            ${{ secrets.VERCEL_APP_URL }}/api/cron/send-lead-reminders
        continue-on-error: true
```

### Step 2: Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `CRON_SECRET`: Same value as `CRON_SECRET` in Vercel
   - `VERCEL_APP_URL`: Your Vercel app URL (e.g., `https://yuvoo.vercel.app`)

### Step 3: Test Workflow

1. Commit and push the workflow file
2. Go to **Actions** tab in GitHub
3. Manually trigger workflow using "Run workflow" button
4. Verify endpoints are called successfully

### Step 4: Remove Vercel Cron Configuration

Once GitHub Actions is working:

1. Remove cron configuration from `vercel.json`:
   ```json
   {
     "crons": [] // Remove or delete this section
   }
   ```
2. Keep the API routes (`/api/cron/*`) as they'll be called by GitHub Actions

### Step 5: Monitor

- Check GitHub Actions logs for execution history
- Monitor Vercel function logs for endpoint calls
- Set up alerts if needed

---

## Implementation Guide: cron-job.org

### Step 1: Sign Up

1. Go to https://cron-job.org
2. Create free account
3. Verify email

### Step 2: Create Expire Leads Job

1. Click "Create cronjob"
2. Configure:
   - **Title**: "Expire Leads"
   - **Address**: `https://yuvoo.vercel.app/api/cron/expire-leads`
   - **Schedule**: `0 0 * * *` (daily at midnight)
   - **Request method**: POST
   - **Request headers**:
     ```
     Authorization: Bearer <YOUR_CRON_SECRET>
     Content-Type: application/json
     ```
   - **Notifications**: Enable email notifications for failures
3. Save cron job

### Step 3: Create Send Reminders Job

1. Click "Create cronjob"
2. Configure:
   - **Title**: "Send Lead Reminders"
   - **Address**: `https://yuvoo.vercel.app/api/cron/send-lead-reminders`
   - **Schedule**: `0 * * * *` (every hour)
   - **Request method**: POST
   - **Request headers**:
     ```
     Authorization: Bearer <YOUR_CRON_SECRET>
     Content-Type: application/json
     ```
   - **Notifications**: Enable email notifications for failures
3. Save cron job

### Step 4: Test

1. Use "Test now" button for each cron job
2. Verify endpoints return success responses
3. Check execution logs

### Step 5: Remove Vercel Cron

Same as GitHub Actions Step 4 above.

---

## Timezone Considerations

### Current Setup (Vercel Cron)

Vercel cron jobs run in UTC. Your schedules:

- `0 0 * * *` = Midnight UTC (2:00 AM EET in Romania)
- `0 * * * *` = Top of every hour UTC

### Adjusting for Romania (EET/EEST)

Romania is UTC+2 (EET) or UTC+3 (EEST during daylight saving).

**For midnight Romania time**:

- **EET (winter)**: `0 22 * * *` (10 PM UTC = midnight EET)
- **EEST (summer)**: `0 21 * * *` (9 PM UTC = midnight EEST)

**Recommendation**: Use UTC and document the timezone in your code/docs, or adjust schedules based on your needs.

---

## Migration Checklist

- [ ] Choose alternative solution (GitHub Actions recommended)
- [ ] Set up external cron service or GitHub Actions workflow
- [ ] Configure secrets/credentials
- [ ] Test cron jobs manually
- [ ] Monitor for 1-2 days to ensure reliability
- [ ] Remove Vercel cron configuration from `vercel.json`
- [ ] Update documentation (`docs/LEAD_SYSTEM_DOCUMENTATION.md`)
- [ ] Update team on new cron setup
- [ ] Set up monitoring/alerts for cron failures

---

## Monitoring & Alerts

### GitHub Actions

- Execution logs visible in GitHub Actions tab
- Email notifications for workflow failures (configure in repository settings)
- Can set up status checks for CI/CD

### cron-job.org

- Execution history in dashboard
- Email notifications for failures
- REST API for programmatic access

### General Monitoring

- Monitor Vercel function logs for endpoint calls
- Set up Sentry alerts for cron endpoint errors
- Track PostHog events for cron job execution

---

## Cost Summary

| Solution           | Monthly Cost | Annual Cost | Notes                      |
| ------------------ | ------------ | ----------- | -------------------------- |
| **GitHub Actions** | $0           | $0          | Free for public repos      |
| **cron-job.org**   | $0           | $0          | Completely free            |
| **EasyCron**       | $0-$2        | $0-$24      | Free tier limited          |
| **CronUptime**     | $0+          | $0+         | Free tier: 5 jobs          |
| **Render**         | $2           | $24         | $1 per cron job            |
| **Vercel Cron**    | $0           | $0          | Current (hourly precision) |

---

## Conclusion

**Recommended Solution**: **GitHub Actions** for projects using GitHub, or **cron-job.org** for external service preference.

Both provide:

- ✅ Per-minute precision
- ✅ Free tier
- ✅ Reliable execution
- ✅ Easy setup
- ✅ Execution logs

**Next Steps**:

1. Review this document
2. Choose preferred solution
3. Follow implementation guide
4. Test thoroughly
5. Migrate from Vercel cron

---

**Last Updated**: January 2026  
**Status**: Research complete, ready for implementation
