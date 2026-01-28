/**
 * Email Divider Component
 *
 * Reusable divider component for emails.
 * Consistent spacing and styling.
 */

import { Hr } from "@react-email/components";
import * as React from "react";
import { YuvooColors } from "../utils/email-types";

interface EmailDividerProps {
  style?: React.CSSProperties;
}

/**
 * Email divider component with Yuvoo branding
 */
export const EmailDivider = ({ style }: EmailDividerProps) => {
  return <Hr style={{ ...dividerStyle, ...style }} />;
};

export default EmailDivider;

// Styles
const dividerStyle = {
  borderColor: YuvooColors.borderGrey,
  margin: "30px 0",
  borderWidth: "1px",
  borderStyle: "solid",
};
