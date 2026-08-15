import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "GearCurator terms of service. Understand the rules, permissions, and disclaimers for using our website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs items={[{ title: "Terms of Service" }]} />

      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Terms of Service
        </h1>
        
        <div className="prose prose-neutral text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-4">
          <p>
            Last updated: August 14, 2026
          </p>
          <p>
            By accessing or using GearCurator, you agree to comply with and be bound by the following Terms of Service.
          </p>
          <h3 className="text-base font-bold text-neutral-800 pt-2">1. Intellectual Property</h3>
          <p>
            All content on GearCurator, including reviews, guides, custom comparison parameters, images, and brand assets, is the property of GearCurator and is protected by copyright laws. You may not reproduce, copy, or redistribute any materials without explicit written consent.
          </p>
          <h3 className="text-base font-bold text-neutral-800 pt-2">2. Accuracy of Information</h3>
          <p>
            While our editors make every effort to verify product details, prices, and specifications, we do not warrant that all content is accurate, complete, or up-to-date. Product availability and pricing are subject to change on Amazon.com without notice.
          </p>
          <h3 className="text-base font-bold text-neutral-800 pt-2">3. Disclaimers</h3>
          <p>
            GEARCURATOR IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE ARE NOT LIABLE FOR ACTIONS TAKEN OR PURCHASES MADE BASED ON INFORMATION PROVIDED ON THE SITE.
          </p>
        </div>
      </div>
    </div>
  );
}
