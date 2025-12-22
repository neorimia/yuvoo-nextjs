/**
 * Email Footer Component
 *
 * Footer for Yuvoo email templates with GDPR compliance information,
 * unsubscribe link, and company information.
 */

import { Link, Section, Text } from "@react-email/components";
import * as React from "react";

interface EmailFooterProps {
  unsubscribeUrl?: string;
  privacyPolicyUrl?: string;
  appUrl?: string;
  unsubscribeToken?: string; // Optional: token for one-click unsubscribe
}

/**
 * Email footer with GDPR compliance and company info
 */
export const EmailFooter = ({
  unsubscribeUrl,
  privacyPolicyUrl,
  appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro",
  unsubscribeToken,
}: EmailFooterProps) => {
  // Use provided URL or generate token-based URL
  const finalUnsubscribeUrl = unsubscribeUrl
    ? unsubscribeUrl
    : unsubscribeToken
      ? `${appUrl}/dezabonare?token=${unsubscribeToken}`
      : `${appUrl}/dezabonare`;

  const finalPrivacyUrl = privacyPolicyUrl || `${appUrl}/confidentialitate`;
  const currentYear = new Date().getFullYear();

  return (
    <Section style={footer}>
      <Text style={footerText}>© {currentYear} Yuvoo. Toate drepturile rezervate.</Text>
      <Text style={footerText}>
        <Link href={finalPrivacyUrl} style={footerLink}>
          Politica de confidențialitate
        </Link>
        {" | "}
        <Link href={finalUnsubscribeUrl} style={footerLink}>
          Dezabonare
        </Link>
      </Text>
      <Text style={footerSmallText}>
        Ai primit acest email pentru că ai solicitat raportul de recomandări sportive. Poți să te
        dezabonezi oricând folosind link-ul de mai sus.
      </Text>
      <Text style={footerSmallText}>
        Yuvoo este ghidul digital pentru părinți în căutarea sportului, sănătății și bunăstării
        copiilor.
      </Text>
    </Section>
  );
};

export default EmailFooter;

// Styles
const footer = {
  backgroundColor: "#f9f9f9",
  padding: "30px 20px",
  textAlign: "center" as const,
  borderTop: "1px solid #E6E6E6",
};

const footerText = {
  color: "#424242",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "8px 0",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const footerLink = {
  color: "#00BBAE",
  textDecoration: "underline",
};

const footerSmallText = {
  color: "#6B6B6B",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "8px 0",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
