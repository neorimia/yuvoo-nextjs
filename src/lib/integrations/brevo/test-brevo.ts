/**
 * Brevo Configuration Test Script
 *
 * This script tests the Brevo email service configuration.
 * Run with: npx tsx src/lib/integrations/brevo/test-brevo.ts
 */

import * as brevo from "@getbrevo/brevo";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Test Brevo configuration
 */
async function testBrevo() {
  console.log("🧪 Testing Brevo Configuration...\n");

  // Step 1: Check environment variables
  console.log("1️⃣ Checking environment variables...");
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;

  if (!apiKey) {
    console.error("❌ BREVO_API_KEY is not set in .env.local");
    console.error('   Please add: BREVO_API_KEY="your-api-key"');
    process.exit(1);
  }

  if (!senderEmail) {
    console.error("❌ BREVO_SENDER_EMAIL is not set in .env.local");
    console.error('   Please add: BREVO_SENDER_EMAIL="noreply@yuvoo.ro"');
    process.exit(1);
  }

  if (!senderName) {
    console.error("❌ BREVO_SENDER_NAME is not set in .env.local");
    console.error('   Please add: BREVO_SENDER_NAME="Yuvoo"');
    process.exit(1);
  }

  // Show API key info (masked for security)
  const apiKeyLength = apiKey.length;
  const apiKeyPrefix = apiKey.substring(0, 15);
  const apiKeySuffix = apiKey.substring(apiKey.length - 4);
  console.log(
    "   ✅ BREVO_API_KEY:",
    `${apiKeyPrefix}...${apiKeySuffix} (length: ${apiKeyLength})`
  );
  console.log("   ✅ BREVO_SENDER_EMAIL:", senderEmail);
  console.log("   ✅ BREVO_SENDER_NAME:", senderName);

  // Validate API key format
  if (!apiKey.startsWith("xkeysib-")) {
    console.error("   ⚠️  WARNING: API key should start with 'xkeysib-'");
    console.error("      Current prefix:", apiKey.substring(0, 10));
  }
  if (apiKeyLength < 50) {
    console.error("   ⚠️  WARNING: API key seems too short (expected ~70+ characters)");
  }
  if (apiKey.includes(" ") || apiKey.includes("\n") || apiKey.includes("\t")) {
    console.error(
      "   ⚠️  WARNING: API key contains whitespace - this will cause authentication to fail"
    );
  }
  console.log();

  // Step 2: Initialize Brevo client
  console.log("2️⃣ Initializing Brevo client...");
  let apiInstance: brevo.TransactionalEmailsApi;
  try {
    apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    console.log("   ✅ Brevo client initialized");
  } catch (error) {
    console.error("   ❌ Failed to initialize Brevo client:", error);
    process.exit(1);
  }
  console.log();

  // Step 3: Test Account API (optional - requires Account permission)
  // This is just a quick check. The real test is email sending in step 4.
  console.log("3️⃣ Testing Brevo Account API (optional)...");
  try {
    const accountApi = new brevo.AccountApi();
    accountApi.setApiKey(brevo.AccountApiApiKeys.apiKey, apiKey);
    const account = await accountApi.getAccount();
    console.log("   ✅ Account API connection successful");
    console.log("   📧 Account email:", account.body?.email || "N/A");
    console.log("   🏢 Company:", account.body?.companyName || "N/A");
  } catch (_accountError: unknown) {
    console.log("   ⚠️  Account API test skipped (key may only have Email permission)");
    console.log("   → This is OK - we'll test with email sending in the next step");
  }
  console.log();

  // Step 4: Send test email
  console.log("4️⃣ Sending test email...");
  const testRecipientEmail = process.env.TEST_EMAIL || senderEmail; // Use TEST_EMAIL if set, otherwise use sender email

  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = "Test Email - Brevo Configuration";
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">✅ Brevo Configuration Test</h2>
        <p>Acest email confirmă că configurația Brevo funcționează corect!</p>
        <p><strong>Detalii:</strong></p>
        <ul>
          <li>API Key: Configurat ✅</li>
          <li>Sender Email: ${senderEmail} ✅</li>
          <li>Sender Name: ${senderName} ✅</li>
          <li>Data: ${new Date().toLocaleString("ro-RO")}</li>
        </ul>
        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          Dacă ai primit acest email, configurația Brevo este corectă și poți continua cu implementarea integrării email.
        </p>
      </div>
    `;
    sendSmtpEmail.textContent = `
Brevo Configuration Test

Acest email confirmă că configurația Brevo funcționează corect!

Detalii:
- API Key: Configurat ✅
- Sender Email: ${senderEmail} ✅
- Sender Name: ${senderName} ✅
- Data: ${new Date().toLocaleString("ro-RO")}

Dacă ai primit acest email, configurația Brevo este corectă și poți continua cu implementarea integrării email.
    `;
    sendSmtpEmail.sender = {
      name: senderName,
      email: senderEmail,
    };
    sendSmtpEmail.to = [{ email: testRecipientEmail }];

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("   ✅ Test email sent successfully!");
    console.log("   📧 Message ID:", result.body?.messageId || "N/A");
    console.log("   📬 Sent to:", testRecipientEmail);
    console.log();
    console.log("   💡 Check your inbox (and spam folder) for the test email.");
  } catch (error: unknown) {
    console.error("   ❌ Failed to send test email");

    // Extract detailed error information
    if (error && typeof error === "object" && "response" in error) {
      const brevoError = error as {
        response?: {
          status?: number;
          statusText?: string;
          body?: unknown;
          data?: unknown;
        };
      };

      const status = brevoError.response?.status;
      const statusText = brevoError.response?.statusText;
      const body = brevoError.response?.body;

      console.error("   Status:", status || "N/A");
      console.error("   Status Text:", statusText || "N/A");

      if (body) {
        console.error("   Error Details:", JSON.stringify(body, null, 2));

        // Check for specific error messages
        if (typeof body === "object" && body !== null) {
          const errorBody = body as Record<string, unknown>;
          if ("message" in errorBody) {
            console.error("   Message:", errorBody.message);
          }
          if ("code" in errorBody) {
            console.error("   Error Code:", errorBody.code);
          }
        }
      } else {
        // Try to get error from data property
        const errorData = brevoError.response?.data;
        if (errorData) {
          console.error("   Error Data:", JSON.stringify(errorData, null, 2));
        }
      }
    } else {
      const errorWithMessage = error as { message?: string };
      console.error("   Error:", errorWithMessage.message || "Unknown error");
    }

    console.error("\n   💡 Troubleshooting steps for 401 Unauthorized:");
    console.error("      1. Check API key permissions in Brevo Dashboard:");
    console.error("         → Go to https://app.brevo.com");
    console.error("         → Settings → API Keys");
    console.error("         → Edit your API key");
    console.error("         → Ensure 'Email' permission is ENABLED (required)");
    console.error("         → 'Account' permission is optional");
    console.error("      2. Verify sender email is verified:");
    console.error("         → Go to Senders & IP");
    console.error("         → Ensure noreply@yuvoo.ro is verified");
    console.error("         → If not verified, check your email and click verification link");
    console.error("      3. Try creating a new API key:");
    console.error("         → Delete the old one");
    console.error("         → Create a new API key");
    console.error("         → Make sure to enable 'Email' permission");
    console.error("         → Copy the FULL key (all characters)");
    console.error("         → Update .env.local and restart dev server");
    console.error("      4. Check account match:");
    console.error("         → Ensure API key is from the same Brevo account");
    console.error("         → where the sender email is verified");
    console.error("      5. Other common issues:");
    console.error("         → Invalid recipient email address");
    console.error("         → Rate limit exceeded (300 emails/day on free tier)");

    process.exit(1);
  }
  console.log();

  // Success!
  console.log("🎉 Brevo configuration test passed!");
  console.log();
  console.log("✅ All checks passed:");
  console.log("   ✅ Environment variables are set correctly");
  console.log("   ✅ Brevo API connection successful");
  console.log("   ✅ Test email sent successfully");
  console.log();
  console.log("🚀 You can now proceed with email integration implementation!");
  console.log("   See: docs/BREVO_EMAIL_INTEGRATION_PLAN.md");
}

// Run the test
testBrevo().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
