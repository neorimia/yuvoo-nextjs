# External Service Integrations

This directory contains integrations with external services.

## Services

### OpenAI

- `openai/client.ts` - OpenAI client configuration
- `openai/prompts.ts` - AI prompt templates
- `openai/quiz.ts` - Quiz recommendation logic

### Cloudinary

- `cloudinary/client.ts` - Cloudinary client configuration
- `cloudinary/upload.ts` - Image upload utilities

### Image Optimization

**Purpose**: Optimize images for performance using Next.js Image component and Cloudinary transformations

**Files**:

- `src/lib/utils/image-optimization.ts` - Image optimization utilities
- `src/lib/integrations/cloudinary/optimization.ts` - Cloudinary-specific optimization
- `src/components/ui/OptimizedImage.tsx` - Reusable optimized image component
- `src/lib/utils/image-helpers.ts` - Image helper utilities

**Features**:

- Automatic Cloudinary URL optimization with transformations
- Responsive image sizes
- Format conversion (WebP, AVIF)
- Quality optimization
- Preset configurations for common use cases

**Usage**:

```typescript
import { optimizeCloudinaryUrl, ImagePresets } from "@/lib/utils/image-optimization";
import OptimizedImage from "@/components/ui/OptimizedImage";

// Optimize Cloudinary URL
const optimizedUrl = optimizeCloudinaryUrl(url, {
  width: 800,
  height: 600,
  quality: 85,
  format: "auto",
});

// Use preset
const thumbUrl = ImagePresets.thumbnail(url);

// Use OptimizedImage component
<OptimizedImage
  src={url}
  alt="Description"
  width={400}
  height={300}
  cloudinaryOptions={{ width: 800, quality: 85 }}
/>
```

**Documentation**: See `docs/IMAGE_OPTIMIZATION_GUIDE.md` for comprehensive guide

## Brevo (Email)

- `brevo/client.ts` - Enhanced Brevo client with error handling and retry logic
- `brevo/templates.ts` - HTML email templates (booking, quiz results)
- `brevo/email.service.ts` - High-level email service functions
- `brevo/types.ts` - TypeScript types for email integration
- `brevo/index.ts` - Central export file
- `brevo/test-brevo.ts` - Configuration test script

**Setup**: See `docs/BREVO_SETUP_GUIDE.md` for complete setup instructions.

**Quick Setup**:

1. Create Brevo account at [brevo.com](https://www.brevo.com)
2. Get API key from [Brevo API Settings](https://app.brevo.com/settings/keys/api)
3. Verify sender email in [Brevo Senders](https://app.brevo.com/settings/senders)
4. Add to `.env.local`:
   ```bash
   BREVO_API_KEY="your-api-key"
   BREVO_SENDER_EMAIL="noreply@yuvoo.ro"
   BREVO_SENDER_NAME="Yuvoo"
   ```
5. Test configuration:
   ```bash
   npx tsx src/lib/integrations/brevo/test-brevo.ts
   ```

**Usage**:

```typescript
import {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingReminder,
  sendQuizResults,
} from "@/lib/integrations/brevo";

// Send booking confirmation
await sendBookingConfirmation(booking, user, club, child);

// Send quiz results
await sendQuizResults(quizResult, child, userEmail, user);
```

## Usage

```typescript
import { generateQuizRecommendations } from "@/lib/integrations/openai/quiz";
import { uploadImage } from "@/lib/integrations/cloudinary/upload";
import { sendEmail } from "@/lib/integrations/brevo/client";
```
