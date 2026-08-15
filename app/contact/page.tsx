import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Team",
  description: "Get in touch with the GearCurator editorial team for reviews feedback, advertising inquiries, or general support.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <Breadcrumbs items={[{ title: "Contact" }]} />

      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-3xl">
          Have a piece of gear you want us to put through the wringer? Or just want to send feedback on a guide? Drop our editorial desk a message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Editorial Desk</h3>
              <p className="text-xs text-neutral-500 mt-1">For review suggestions and guidelines questions.</p>
              <p className="text-sm font-semibold text-neutral-800 mt-2">editor@gearcurator.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">General Support</h3>
              <p className="text-xs text-neutral-500 mt-1">For technical site questions or advertising rates.</p>
              <p className="text-sm font-semibold text-neutral-800 mt-2">hello@gearcurator.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Mailing Address</h3>
              <p className="text-xs text-neutral-500 mt-1">GearCurator Editorial, LLC</p>
              <p className="text-sm font-semibold text-neutral-800 mt-2">
                100 Workspace Boulevard, Suite 500<br />
                San Francisco, CA 94103
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Placeholder */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                disabled
                placeholder="Name"
                className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-xs text-neutral-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                disabled
                placeholder="email@example.com"
                className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-xs text-neutral-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                disabled
                placeholder="Form disabled in Phase 1 setup"
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-400 cursor-not-allowed resize-none"
              />
            </div>
            <button
              type="button"
              disabled
              className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-neutral-200 text-xs font-bold text-neutral-400 cursor-not-allowed"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
