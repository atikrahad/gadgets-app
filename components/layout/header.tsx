"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-1.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <svg className="h-full w-full text-slate-950" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8H22C23.1046 8 24 8.89543 24 10V22C24 23.1046 23.1046 24 22 24H10C8.89543 24 8 23.1046 8 22V10C8 8.89543 8.89543 8 10 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="3.5" fill="currentColor"/>
                <path d="M16 8V12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 19.5V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
              Gadget<span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Nexus</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Search & Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              placeholder="Search tech & gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-64 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 pl-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </form>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            href="/search"
            className="p-2 text-neutral-500 hover:text-neutral-900"
            aria-label="Search page"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 focus:outline-none"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-neutral-900/10 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed top-16 inset-y-0 right-0 z-50 w-full max-w-xs bg-white border-l border-neutral-100 p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <form onSubmit={handleSearchSubmit} className="relative mb-6">
          <input
            type="search"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 pl-10 text-sm focus:border-neutral-950 focus:bg-white focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
        </form>

        <nav className="flex flex-col space-y-4">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 border-b border-neutral-50"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-neutral-100 pt-6">
          <p className="text-xs text-neutral-400 leading-relaxed">
            GearCurator reviews are independent and expert-supported. We earn affiliate commissions when you purchase through our links.
          </p>
        </div>
      </div>
    </header>
  );
}
