import Link from "next/link";
import { ArrowLeft, Home, Search, Compass, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-inner">
          <ShieldAlert className="h-10 w-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Page Not Found
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The gear page or guide you are looking for has been moved, renamed, or no longer exists.
          </p>
        </div>

        {/* Quick Links Navigation */}
        <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 space-y-4 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Explore Popular Destinations
          </span>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/categories"
              className="flex items-center gap-2 rounded-xl bg-white p-3 text-xs font-bold text-neutral-900 border border-neutral-200/60 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
            >
              <Compass className="h-4 w-4 text-emerald-600" />
              <span>Categories</span>
            </Link>
            <Link
              href="/buying-guides"
              className="flex items-center gap-2 rounded-xl bg-white p-3 text-xs font-bold text-neutral-900 border border-neutral-200/60 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
            >
              <Search className="h-4 w-4 text-emerald-600" />
              <span>Buying Guides</span>
            </Link>
            <Link
              href="/reviews"
              className="flex items-center gap-2 rounded-xl bg-white p-3 text-xs font-bold text-neutral-900 border border-neutral-200/60 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
            >
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
              <span>Reviews</span>
            </Link>
            <Link
              href="/compare"
              className="flex items-center gap-2 rounded-xl bg-white p-3 text-xs font-bold text-neutral-900 border border-neutral-200/60 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
            >
              <Home className="h-4 w-4 text-emerald-600" />
              <span>Compare</span>
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
