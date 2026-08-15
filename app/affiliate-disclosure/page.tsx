import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "GearCurator affiliate disclosure policy. Learn how we earn advertising fees by linking to Amazon.com.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs items={[{ title: "Affiliate Disclosure" }]} />

      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Affiliate Disclosure
        </h1>
        
        <div className="prose prose-neutral text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-4">
          <p>
            Welcome to GearCurator. We believe in transparency on the web, so we want to detail how we fund our operations.
          </p>
          <p className="font-semibold text-neutral-800 bg-neutral-50 border border-neutral-100 rounded-xl p-5">
            {siteConfig.affiliateDisclosure}
          </p>
          <p>
            <strong>What is an Affiliate Link?</strong><br />
            An affiliate link is a specific URL containing a tracking code. When you click on one of our product links and make a purchase on Amazon, we receive a small percentage commission of the sale price at no additional cost to you.
          </p>
          <p>
            <strong>Why do we use Affiliate Links?</strong><br />
            Reviewing gear requires capital. We purchase products for testing, spend hours executing comparisons, and write detailed buying guides. Affiliate commissions allow us to support our staff and run our servers without relying on pop-up ads, subscription walls, or sponsored content that might skew our editorial independence.
          </p>
          <p>
            <strong>Does this affect our reviews?</strong><br />
            No. Our product recommendations are driven strictly by testing criteria, technical specs, and editorial evaluations. We often review and highlight negative aspects of products. If a product does not meet our high benchmarks, we tell you—even if it means losing an affiliate sale. We prioritize reader trust above everything.
          </p>
        </div>
      </div>
    </div>
  );
}
