/**
 * Cloudinary Client Configuration
 *
 * Cloudinary setup for image uploads and CDN delivery.
 */

import { v2 as cloudinary } from "cloudinary";

// Validate required environment variables
const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName) {
  throw new Error(
    "CLOUDINARY_CLOUD_NAME or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is required"
  );
}

if (!apiKey) {
  throw new Error("CLOUDINARY_API_KEY environment variable is required");
}

if (!apiSecret) {
  throw new Error("CLOUDINARY_API_SECRET environment variable is required");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
  // Use SHA-256 for signature algorithm (default is SHA-1, but some accounts require SHA-256)
  signature_algorithm: "sha256",
});

export { cloudinary };
