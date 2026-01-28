# GitHub Actions Cron Jobs Setup Guide

This guide explains how to set up GitHub Actions to replace Vercel cron jobs for per-minute precision scheduling.

---

## Overview

GitHub Actions will call your Vercel API endpoints on schedule:

- **Expire Leads**: Daily at midnight UTC (`0 0 * * *`)
- **Send Lead Reminders**: Every hour (`0 * * * *`)

---

## Step 1: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets

**`CRON_SECRET`**

- Value: Same value as `CRON_SECRET` in your Vercel environment variables
- This is the secret token that protects your cron endpoints
- Example: `your-secret-key-here`

**`VERCEL_APP_URL`**

- Value: Your Vercel app URL
- Production: `https://yuvoo.vercel.app` (or your custom domain)
- Staging: `https://yuvoo-staging.vercel.app` (if applicable)
- **Important**: Use your production URL unless testing

---

## Step 2: Verify Workflow File

The workflow file is located at:

```
.github/workflows/cron-jobs.yml
```

It's already configured with:

- ✅ Daily schedule for expire-leads (`0 0 * * *`)
- ✅ Hourly schedule for send-lead-reminders (`0 * * * *`)
- ✅ Manual trigger support (`workflow_dispatch`)
- ✅ Error handling (`continue-on-error: true`)

---

## Step 3: Test the Workflow

### Manual Test

1. Go to **Actions** tab in GitHub
2. Select **Yuvoo Cron Jobs** workflow
3. Click **Run workflow** → **Run workflow**
4. Check the execution logs to verify:
   - ✅ Endpoints are called successfully
   - ✅ Response status is 200
   - ✅ No authentication errors

### Verify Endpoints

Check your Vercel function logs to confirm:

- Endpoints receive requests
- `Authorization` header is present
- Jobs execute successfully

---

## Step 4: Monitor Usage

### GitHub Actions Minutes

- **Free tier**: 2,000 minutes/month for private repos
- **Estimated usage**: ~125 minutes/month
  - Expire leads: 30 executions/month × 5 seconds = 2.5 minutes
  - Send reminders: 720 executions/month × 10 seconds = 120 minutes
- **Status**: Well within free tier limits ✅

### Check Usage

1. Go to **Settings** → **Billing** → **Plans and usage**
2. View **Actions** usage under "Included services"

---

## Step 5: Remove Vercel Cron (After Testing)

Once GitHub Actions is working reliably (test for 1-2 days):

1. Open `vercel.json`
2. Remove or comment out the `crons` section:

```json
{
  // ... other config ...
  // "crons": [
  //   {
  //     "path": "/api/cron/expire-leads",
  //     "schedule": "0 0 * * *"
  //   },
  //   {
  //     "path": "/api/cron/send-lead-reminders",
  //     "schedule": "0 * * * *"
  //   }
  // ]
}
```

3. Commit and push changes
4. Vercel cron jobs will stop running

**Important**: Keep the API routes (`/api/cron/*`) - they'll be called by GitHub Actions.

---

## Timezone Considerations

### Current Schedule (UTC)

- **Expire Leads**: `0 0 * * *` = Midnight UTC (2:00 AM EET in Romania)
- **Send Reminders**: `0 * * * *` = Top of every hour UTC

### Adjusting for Romania (EET/EEST)

Romania is UTC+2 (EET) or UTC+3 (EEST during daylight saving).

**To run at midnight Romania time**, update the cron schedule in `.github/workflows/cron-jobs.yml`:

```yaml
# For midnight EET (winter): 10 PM UTC = midnight EET
- cron: "0 22 * * *"

# For midnight EEST (summer): 9 PM UTC = midnight EEST
- cron: "0 21 * * *"
```

**Recommendation**: Keep UTC and document the timezone, or adjust based on your needs.

---

## Troubleshooting

### Workflow Not Running

- Check **Actions** tab for workflow runs
- Verify cron schedule syntax is correct
- Ensure workflow file is in `.github/workflows/` directory

### 401 Unauthorized Errors

- Verify `CRON_SECRET` secret matches Vercel environment variable
- Check `Authorization` header format: `Bearer <secret>`
- Ensure secret is set correctly in GitHub repository settings

### Endpoint Not Found (404)

- Verify `VERCEL_APP_URL` secret is correct
- Check URL includes protocol (`https://`)
- Ensure no trailing slash in URL

### Workflow Fails Silently

- Check `continue-on-error: true` - errors won't fail the workflow
- Review workflow logs in GitHub Actions tab
- Check Vercel function logs for endpoint errors

---

## Monitoring

### GitHub Actions Logs

- Go to **Actions** tab → **Yuvoo Cron Jobs**
- View execution history and logs
- Set up email notifications for workflow failures (Settings → Notifications)

### Vercel Function Logs

- Check Vercel dashboard → Functions → Logs
- Filter by `/api/cron/expire-leads` or `/api/cron/send-lead-reminders`
- Monitor for errors or unexpected behavior

### PostHog Events

- Cron jobs track events in PostHog
- Monitor `lead_expired` and `lead_reminder_sent` events
- Verify jobs are executing as expected

---

## Benefits Over Vercel Cron

✅ **Per-minute precision** (vs hourly on Hobby plan)  
✅ **Free** (within 2,000 minutes/month limit)  
✅ **Integrated** with codebase (version controlled)  
✅ **Execution logs** in GitHub  
✅ **Manual trigger** support for testing  
✅ **No external dependency** (if using GitHub)

---

## Next Steps

1. ✅ Add GitHub secrets (`CRON_SECRET`, `VERCEL_APP_URL`)
2. ✅ Test workflow manually
3. ✅ Monitor for 1-2 days
4. ✅ Remove Vercel cron configuration
5. ✅ Update team documentation

---

**Last Updated**: January 2026  
**Status**: Ready for setup
