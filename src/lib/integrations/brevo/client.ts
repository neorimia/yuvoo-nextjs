/**
 * Brevo (Email) Client Configuration
 *
 * Brevo API client for transactional emails.
 */

import * as brevo from "@getbrevo/brevo";

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY environment variable is required");
}

export const brevoClient = new brevo.TransactionalEmailsApi();
brevoClient.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
