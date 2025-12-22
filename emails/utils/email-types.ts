/**
 * Email Types
 *
 * TypeScript type definitions for email templates and props.
 */

/**
 * Base props for all email templates
 */
export interface BaseEmailProps {
  preview?: string;
}

/**
 * Common email styling options
 */
export interface EmailStyleOptions {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
}

/**
 * Email link configuration
 */
export interface EmailLinkConfig {
  text: string;
  href: string;
  style?: React.CSSProperties;
}

/**
 * Yuvoo brand colors for emails
 */
export const YuvooColors = {
  primary: "#00BBAE",
  secondary: "#FF9B24",
  accent: "#7C81FF",
  textPrimary: "#1B1B1B",
  textBody: "#424242",
  textSecondary: "#6B6B6B",
  textMuted: "#9B9B9B",
  backgroundLight: "#F5F5F5",
  backgroundWhite: "#FFFFFF",
  backgroundCyanLight: "#EBFFFE",
  backgroundBeigeLight: "#FFF6EB",
  backgroundOrangeLight: "#FFECD6",
  borderGrey: "#E6E6E6",
} as const;

/**
 * Common email typography styles
 */
export const EmailTypography = {
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "32px",
    color: YuvooColors.textPrimary,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },
  body: {
    fontSize: "16px",
    lineHeight: "26px",
    color: YuvooColors.textBody,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },
  small: {
    fontSize: "14px",
    lineHeight: "20px",
    color: YuvooColors.textSecondary,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },
} as const;
