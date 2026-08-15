import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "GearCurator privacy policy. Learn how we collect, store, and manage user data in compliance with privacy regulations.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs items={[{ title: "Privacy Policy" }]} />

      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Privacy Policy
        </h1>
        
        <div className="prose prose-neutral text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-4">
          <p>
            Last updated: August 14, 2026
          </p>
          <p>
            GearCurator respects your privacy and is committed to protecting it. This Privacy Policy details how we handle information collected when you visit our website.
          </p>
          <h3 className="text-base font-bold text-neutral-800 pt-2">1. Information We Collect</h3>
          <p>
            We do not require account registration, and we do not collect personal information (like names or email addresses) unless you explicitly send it to us via direct email. We may log basic anonymous analytics data (IP address, browser type, pages viewed) to understand traffic patterns and optimize loading performance.
          </p>
          <h3 className="text-base font-bold text-neutral-800 pt-2">2. Cookies and Tracking</h3>
          <p>
            Because we use Amazon affiliate links, third-party cookies may be set by Amazon when you click our links to trace purchases back to our affiliate tracking ID. You can disable cookies in your browser settings at any time.
          </p>
          <h3 className="text-base font-bold text-neutral-800 pt-2">3. Data Security</h3>
          <p>
            We implement standard security measures to protect site traffic and assure a secure browsing experience. However, please be aware that no transmission of data over the internet is 100% secure.
          </p>
        </div>
      </div>
    </div>
  );
}
