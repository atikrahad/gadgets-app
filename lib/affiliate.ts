import { siteConfig } from "@/config/site";

export interface AffiliateLinkParams {
  asin: string;
  marketplace?: string;
  tag?: string;
}

const MARKETPLACE_DOMAINS: Record<string, string> = {
  US: "amazon.com",
  UK: "amazon.co.uk",
  DE: "amazon.de",
  CA: "amazon.ca",
  FR: "amazon.fr",
  ES: "amazon.es",
  IT: "amazon.it",
  JP: "amazon.co.jp",
};

/**
 * Generates a clean Amazon affiliate link for a specific ASIN and marketplace.
 */
export function getAmazonAffiliateLink({ asin, marketplace = "US", tag }: AffiliateLinkParams): string {
  const domain = MARKETPLACE_DOMAINS[marketplace.toUpperCase()] || "amazon.com";
  
  // Resolve tracking tag from parameter or fallback to config defaults
  let trackingTag = tag;
  if (!trackingTag) {
    const configMarketplace = siteConfig.marketplaces.find(
      (m) => m.code.toUpperCase() === marketplace.toUpperCase()
    );
    trackingTag = configMarketplace?.defaultTag || "gearcurator-20";
  }

  return `https://www.${domain}/dp/${asin}/?tag=${trackingTag}`;
}

/**
 * Sanitizes or wraps a buying URL. If it's a direct Amazon link, parses and clean-tags it.
 */
export function sanitizeBuyUrl(url: string, marketplace = "US"): string {
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname.includes("amazon.") ||
      parsedUrl.hostname === "amzn.to"
    ) {
      // If it's a short link, keep it or handle it.
      // If it contains /dp/ or /gp/product/, we can extract the ASIN.
      const match = url.match(/(?:\/dp\/|\/gp\/product\/)([A-Z0-9]{10})/i);
      if (match && match[1]) {
        return getAmazonAffiliateLink({ asin: match[1], marketplace });
      }
    }
  } catch {
    // If it's not a valid URL or parsing fails, return as-is
  }
  return url;
}
