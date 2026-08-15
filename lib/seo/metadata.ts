import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface ConstructMetadataOptions {
  title?: string;
  description?: string;
  image?: string | null;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  path = "",
  noIndex = false,
  type = "website",
  publishedTime,
  authors,
}: ConstructMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - Expert Workstation & Gear Reviews`;
  const canonicalUrl = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImageUrl = image || siteConfig.ogImage;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
      creator: "@gearcurator",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
