import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50 text-neutral-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              Gear<span className="text-emerald-600">Curator</span>
            </span>
            <p className="max-w-sm text-sm text-neutral-500 leading-relaxed">
              {siteConfig.description} We write rigorous, independent reviews of gear to help you make informed decisions.
            </p>
          </div>

          {/* Editorial Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-4">
              Editorial
            </h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.editorial.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-neutral-900 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-neutral-900 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Section */}
        <div className="mt-8 border-t border-neutral-200/50 pt-8">
          <div className="rounded-lg border border-neutral-200/60 bg-white p-4">
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wide mb-1">
              Affiliate Disclosure
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {siteConfig.affiliateDisclosure}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} GearCurator. All rights reserved.</p>
          <p className="flex gap-4">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
