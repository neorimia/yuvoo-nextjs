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

  console.log("   ✅ BREVO_API_KEY:", apiKey.substring(0, 20) + "...");
  console.log("   ✅ BREVO_SENDER_EMAIL:", senderEmail);
  console.log("   ✅ BREVO_SENDER_NAME:", senderName);
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

  // Step 3: Test API connection (get account info)
  console.log("3️⃣ Testing Brevo API connection...");
  try {
    const accountApi = new brevo.AccountApi();
    accountApi.setApiKey(brevo.AccountApiApiKeys.apiKey, apiKey);
    const account = await accountApi.getAccount();
    console.log("   ✅ API connection successful");
    console.log("   📧 Account email:", account.body?.email || "N/A");
    console.log("   🏢 Company:", account.body?.companyName || "N/A");
  } catch (error: unknown) {
    console.error("   ❌ API connection failed");
    if (error && typeof error === "object" && "response" in error) {
      const brevoError = error as { response?: { body?: unknown } };
      if (brevoError.response?.body) {
        console.error("   Error:", brevoError.response.body);
      } else {
        const errorWithMessage = error as { message?: string };
        console.error("   Error:", errorWithMessage.message || "Unknown error");
      }
    } else {
      const errorWithMessage = error as { message?: string };
      console.error("   Error:", errorWithMessage.message || "Unknown error");
    }
    console.error("\n   💡 Check that:");
    console.error("      - API key is correct and complete");
    console.error("      - API key has 'Email' permissions");
    console.error("      - No extra spaces in API key");
    process.exit(1);
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
    if (error && typeof error === "object" && "response" in error) {
      const brevoError = error as { response?: { body?: unknown } };
      if (brevoError.response?.body) {
        console.error("   Error:", JSON.stringify(brevoError.response.body, null, 2));
      } else {
        const errorWithMessage = error as { message?: string };
        console.error("   Error:", errorWithMessage.message || "Unknown error");
      }
    } else {
      const errorWithMessage = error as { message?: string };
      console.error("   Error:", errorWithMessage.message || "Unknown error");
    }
    console.error("\n   💡 Common issues:");
    console.error("      - Sender email not verified in Brevo dashboard");
    console.error("      - Invalid recipient email address");
    console.error("      - Rate limit exceeded (300 emails/day on free tier)");
    console.error("      - Check Brevo dashboard → Senders for verification status");
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
