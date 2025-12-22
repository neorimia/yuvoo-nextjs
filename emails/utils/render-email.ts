/**
 * Email Rendering Utilities
 *
 * Functions to render React Email components to HTML strings
 * for integration with Brevo email service.
 */

import { render } from "@react-email/render";
import type { ReactElement } from "react";

/**
 * Render React Email component to HTML string
 *
 * @param component - React Email component
 * @returns HTML string ready for email sending
 */
export async function renderEmailToHtml(component: ReactElement): Promise<string> {
  return await render(component);
}

/**
 * Render React Email component to plain text
 *
 * @param component - React Email component
 * @returns Plain text version of the email
 */
export async function renderEmailToText(component: ReactElement): Promise<string> {
  return await render(component, { plainText: true });
}

/**
 * Render React Email component to both HTML and text
 *
 * @param component - React Email component
 * @returns Object with both HTML and text versions
 */
export async function renderEmail(
  component: ReactElement
): Promise<{ html: string; text: string }> {
  const [html, text] = await Promise.all([
    renderEmailToHtml(component),
    renderEmailToText(component),
  ]);

  return { html, text };
}
