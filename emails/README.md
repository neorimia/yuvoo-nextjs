# Yuvoo Email Templates

This directory contains React Email templates for transactional emails sent by Yuvoo.

## Structure

```
emails/
├── components/          # Reusable email components
│   ├── EmailLayout.tsx
│   ├── EmailHeader.tsx
│   ├── EmailFooter.tsx
│   └── ...
├── utils/               # Email utility functions
│   ├── render-email.ts
│   └── email-types.ts
├── preview-data/        # Mock data for preview server
│   └── quiz-results.ts
├── quiz-results-email.tsx  # Quiz results email template
└── test-email.tsx       # Test email template
```

## Development

### Preview Server

Start the React Email preview server to view and test email templates:

```bash
npm run email:dev
```

The preview server will start at `http://localhost:3000` (or next available port) and automatically discover all email templates in this directory.

### Creating New Email Templates

1. Create a new `.tsx` file in the `emails/` directory
2. Use React Email components from `@react-email/components`
3. Follow the Yuvoo brand guidelines (colors, typography)
4. All content must be in Romanian
5. Test in the preview server before integration

### Email Template Structure

```tsx
import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface MyEmailProps {
  // Define props
}

export const MyEmail = ({ ...props }: MyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Email preview text</Preview>
      <Body style={main}>
        <Container style={container}>{/* Email content */}</Container>
      </Body>
    </Html>
  );
};

export default MyEmail;
```

## Brand Guidelines

### Colors

- **Primary**: `#00BBAE` (Turcoaz/Cyan)
- **Secondary**: `#FF9B24` (Portocaliu/Orange)
- **Accent**: `#7C81FF` (Violet/Albastru)
- **Text Primary**: `#1B1B1B`
- **Text Body**: `#424242`
- **Background**: `#FFFFFF` or `#F5F5F5`

### Typography

- **Font Family**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Heading**: 24px, font-weight 600
- **Body**: 16px, line-height 26px

## Integration

Email templates are rendered to HTML strings and sent via Brevo service:

```typescript
import { render } from '@react-email/render';
import MyEmail from '@/emails/my-email';

const html = await render(MyEmail({ ...props }));
const text = await render(MyEmail({ ...props }), { plainText: true });

// Send via Brevo
await sendEmail({ htmlContent: html, textContent: text, ... });
```

## Testing

1. Use preview server for visual testing
2. Test in multiple email clients (Gmail, Outlook, Apple Mail)
3. Verify responsive design on mobile
4. Check all links and CTAs
5. Verify Romanian language content

## Resources

- [React Email Documentation](https://react.email/docs)
- [React Email Components](https://react.email/components)
- [Yuvoo Brand Guidelines](../../docs/BRAND_GUIDELINES.md)
- [Yuvoo Design Tokens](../../docs/DESIGN_TOKENS.md)
