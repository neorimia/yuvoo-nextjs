/**
 * Email Layout Component
 *
 * Base wrapper for all Yuvoo email templates.
 * Provides consistent structure, styling, and branding.
 */

import { Body, Container, Head, Html } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./EmailFooter";
import { EmailHeader } from "./EmailHeader";

interface EmailLayoutProps {
  preview?: string;
  children: React.ReactNode;
}

/**
 * Base email layout with Yuvoo branding
 */
export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  return (
    <Html lang="ro">
      <Head>{preview && <title>{preview}</title>}</Head>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />
          {children}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default EmailLayout;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  marginBottom: "64px",
  maxWidth: "600px",
};
