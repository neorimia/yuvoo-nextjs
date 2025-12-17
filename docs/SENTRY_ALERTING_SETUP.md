# Sentry Alerting Setup Guide

Complete guide for configuring alerts in Sentry for critical errors and performance issues.

**Last Updated**: January 2025  
**Status**: Ready for Configuration

---

## Overview

Sentry alerts notify you when critical issues occur, helping you respond quickly to production problems. This guide covers setting up email alerts for:

- High error rates (>5% error rate)
- Slow page loads (>3s page load)
- New error types
- Performance degradation

---

## Prerequisites

1. ✅ **Sentry Account**: You should already have this from error tracking setup
2. ✅ **Sentry Project**: Your Yuvoo project should be configured
3. ✅ **Email Address**: Email where you want to receive alerts

---

## Step 1: Access Alert Rules

1. Go to [Sentry Dashboard](https://sentry.io)
2. Select your **Yuvoo** project
3. Navigate to **Alerts** → **Alert Rules** (or **Alerts** → **Create Alert Rule**)

---

## Step 2: Create Error Rate Alert

**Purpose**: Alert when error rate exceeds 5%

1. Click **"Create Alert Rule"**
2. **Select Condition**: "An event is seen"
3. **Configure**:
   - **Environment**: Production (or All Environments)
   - **Time Window**: Last 1 hour
   - **Threshold**: Error rate > 5%
   - **Comparison**: Percentage of sessions
4. **Actions**:
   - Click **"Add Action"** → **"Send a notification"**
   - Select **"Email"**
   - Enter your email address
5. **Name**: "High Error Rate Alert (>5%)"
6. Click **"Save Rule"**

---

## Step 3: Create Slow Page Load Alert

**Purpose**: Alert when page load time exceeds 3 seconds

1. Click **"Create Alert Rule"**
2. **Select Condition**: "An event is seen" → Filter by transaction
3. **Configure**:
   - **Environment**: Production
   - **Transaction**: `page.load`
   - **Metric**: `p95(transaction.duration)`
   - **Threshold**: > 3000ms (3 seconds)
   - **Time Window**: Last 1 hour
4. **Actions**:
   - Click **"Add Action"** → **"Send a notification"**
   - Select **"Email"**
   - Enter your email address
5. **Name**: "Slow Page Load Alert (>3s)"
6. Click **"Save Rule"**

---

## Step 4: Create New Issue Alert

**Purpose**: Alert when new error types appear

1. Click **"Create Alert Rule"**
2. **Select Condition**: "A new issue is created"
3. **Configure**:
   - **Environment**: Production
   - **Minimum Issue Count**: 1
   - **Time Window**: Last 1 hour
4. **Filters** (optional):
   - **Issue Level**: Error or Fatal only
5. **Actions**:
   - Click **"Add Action"** → **"Send a notification"**
   - Select **"Email"**
   - Enter your email address
6. **Name**: "New Issue Alert"
7. Click **"Save Rule"**

---

## Step 5: Create Performance Degradation Alert

**Purpose**: Alert when API response times degrade

1. Click **"Create Alert Rule"**
2. **Select Condition**: "An event is seen" → Filter by transaction
3. **Configure**:
   - **Environment**: Production
   - **Transaction**: `api.*` (all API routes)
   - **Metric**: `p95(transaction.duration)`
   - **Threshold**: > 2000ms (2 seconds)
   - **Time Window**: Last 1 hour
4. **Actions**:
   - Click **"Add Action"** → **"Send a notification"**
   - Select **"Email"**
   - Enter your email address
5. **Name**: "API Performance Degradation (>2s)"
6. Click **"Save Rule"**

---

## Step 6: Configure Email Settings

1. Go to **Settings** → **Notifications**
2. **Email Notifications**:
   - ✅ Enable "Send notifications to"
   - Enter your email address
   - ✅ Enable "Notify me about new issues"
   - ✅ Enable "Notify me about resolved issues"
3. **Frequency**:
   - Choose "Only for issues I subscribe to" (recommended)
   - Or "For all issues" (more notifications)

---

## Step 7: Test Alerts

### Test Error Rate Alert

1. Go to **Alerts** → Your alert rule
2. Click **"Test Alert"** (if available)
3. Or trigger a test error in your application:
   ```typescript
   // In development only
   if (process.env.NODE_ENV === "development") {
     throw new Error("Test error for alerting");
   }
   ```

### Test Email Delivery

1. Sentry will send a test email when you create the alert
2. Check your inbox (and spam folder)
3. Verify email format and content

---

## Alert Rule Examples

### Example 1: Critical Errors Only

```yaml
Condition: Event is seen
Filters:
  - Level: Fatal or Error
  - Environment: Production
Threshold: > 10 events in 1 hour
Action: Email notification
```

### Example 2: API Error Rate

```yaml
Condition: Event is seen
Filters:
  - Transaction: api.*
  - Status: 5xx
Threshold: Error rate > 10% in 1 hour
Action: Email notification
```

### Example 3: User Impact Alert

```yaml
Condition: Event is seen
Filters:
  - Level: Error or Fatal
  - Users affected: > 100
Threshold: > 50 events in 1 hour
Action: Email notification
```

---

## Best Practices

### Alert Thresholds

- **Error Rate**: Start with 5%, adjust based on baseline
- **Page Load**: 3 seconds is a good starting point (Core Web Vitals target: < 2.5s)
- **API Response**: 2 seconds for p95 is reasonable
- **New Issues**: Alert on first occurrence, but review to avoid noise

### Alert Frequency

- **Don't over-alert**: Too many alerts = alert fatigue
- **Use alert rules**: Combine multiple conditions
- **Set appropriate thresholds**: Based on your actual metrics
- **Review and adjust**: Regularly review alert effectiveness

### Alert Actions

- **Email**: Good for critical alerts
- **Slack**: Better for team notifications (set up Slack integration)
- **PagerDuty**: For on-call escalation (if applicable)

---

## Advanced: Slack Integration

### Setup Slack Integration

1. Go to **Settings** → **Integrations** → **Slack**
2. Click **"Add Integration"**
3. Follow the Slack authorization flow
4. Select channel for alerts
5. Update alert rules to use Slack instead of (or in addition to) email

---

## Acceptance Criteria Checklist

- [ ] Error rate alert configured (>5% error rate)
- [ ] Slow page load alert configured (>3s page load)
- [ ] New issue alert configured
- [ ] Performance degradation alert configured (optional)
- [ ] Email notifications enabled
- [ ] Test alerts sent successfully
- [ ] Email delivery verified
- [ ] Alert thresholds reviewed and adjusted

---

## Troubleshooting

### Alerts Not Triggering

- Check alert rule conditions match your events
- Verify environment filters (production vs development)
- Check Sentry is receiving events (go to Issues page)
- Verify thresholds are not too high

### Too Many Alerts

- Increase thresholds
- Add more filters (environment, level, etc.)
- Use "Only for issues I subscribe to" frequency
- Review and disable noisy alert rules

### Emails Not Received

- Check spam folder
- Verify email address in Sentry settings
- Check email delivery settings in Sentry
- Verify alert rule actions include email notification

---

## Next Steps

1. **Monitor alerts**: Watch for a few days to fine-tune thresholds
2. **Set up Slack** (optional): For team notifications
3. **Create dashboards**: See "Dashboard Setup" guide
4. **Review alerts regularly**: Adjust thresholds based on actual metrics

---

**Related Documentation**:

- `docs/MONITORING_SETUP_GUIDE.md` - Complete monitoring setup
- `docs/POSTHOG_DASHBOARD_SETUP.md` - PostHog dashboard configuration
