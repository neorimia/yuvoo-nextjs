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

### Brevo (Email)

- `brevo/client.ts` - Brevo client configuration
- `brevo/templates.ts` - Email templates

## Usage

```typescript
import { generateQuizRecommendations } from "@/lib/integrations/openai/quiz";
import { uploadImage } from "@/lib/integrations/cloudinary/upload";
import { sendEmail } from "@/lib/integrations/brevo/client";
```
