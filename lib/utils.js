import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import paypal from "@paypal/checkout-server-sdk"; // ✅ Correct import

// Tailwind Utility
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// PayPal Configuration
export function createPayPalClient() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PAYPAL_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("❌ Missing PayPal credentials in environment variables");
  }

  const environment =
    process.env.NODE_ENV === "production"
      ? new paypal.core.LiveEnvironment(clientId, clientSecret)
      : new paypal.core.SandboxEnvironment(clientId, clientSecret);

  return new paypal.core.PayPalHttpClient(environment);
}

