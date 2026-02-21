import { Address4, Address6 } from "ip-address";
import { z } from "zod";

const INTERNAL_HOSTNAMES = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "metadata.google.internal", // GCP metadata
  "169.254.169.254", // AWS/Common cloud metadata
];

/**
 * Checks if a hostname is an internal/private IP address.
 */
function isInternalIP(hostname: string): boolean {
  try {
    // Check IPv4
    if (Address4.isValid(hostname)) {
      const addr = new Address4(hostname);
      // Manual check for private ranges if isPrivate is missing
      const octets = addr.toArray();
      if (octets[0] === 10) return true;
      if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true;
      if (octets[0] === 192 && octets[1] === 168) return true;
      if (octets[0] === 127) return true;
      if (octets[0] === 0) return true;
      return false;
    }
    // Check IPv6
    if (Address6.isValid(hostname)) {
      const addr = new Address6(hostname);
      return addr.isLoopback() || hostname === "::1" || hostname.startsWith("fe80:");
    }
  } catch (e) {
    return false;
  }
  return false;
}

export const urlSchema = z
  .string()
  .url()
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          return false;
        }
        const hostname = parsed.hostname.toLowerCase();

        if (
          INTERNAL_HOSTNAMES.some((h) => hostname === h || hostname.endsWith(`.${h}`))
        ) {
          return false;
        }

        if (isInternalIP(hostname)) {
          return false;
        }

        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid URL or internal address blocked for security.",
    },
  );

export function validateUrl(url: string) {
  return urlSchema.safeParse(url);
}
