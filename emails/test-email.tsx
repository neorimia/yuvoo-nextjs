/**
 * Test Email Template
 *
 * Basic email template to test React Email preview server.
 * Demonstrates usage of EmailLayout, EmailSection components.
 */

import { Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailLayout } from "./components/EmailLayout";
import { EmailSection } from "./components/EmailSection";

interface TestEmailProps {
  name?: string;
}

export const TestEmail = ({ name = "Yuvoo" }: TestEmailProps) => {
  return (
    <EmailLayout preview="Test email from Yuvoo">
      <Preview>Test email from Yuvoo</Preview>
      <EmailSection>
        <Text style={paragraph}>Bună, {name}!</Text>
        <Text style={paragraph}>
          Acesta este un email de test pentru configurarea React Email. Dacă vezi acest email,
          înseamnă că preview server-ul funcționează corect.
        </Text>
        <Text style={paragraph}>
          Acest email folosește componentele de bază (EmailLayout, EmailSection) create în Phase 1.
        </Text>
        <Text style={paragraph}>
          Următorul pas este crearea template-ului pentru rezultatele quiz-ului.
        </Text>
      </EmailSection>
    </EmailLayout>
  );
};

export default TestEmail;

// Styles
const paragraph = {
  color: "#424242",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
