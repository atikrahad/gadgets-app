import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, getProducts } from "@/lib/services/product";
import { getBuyingGuides } from "@/lib/services/buying-guide";
import { getRooms, getAesthetics, getSetups } from "@/lib/services/home-setup";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { RoomCard } from "@/components/room/room-card";
import { AestheticCard } from "@/components/aesthetic/aesthetic-card";
import { SetupCard } from "@/components/setup/setup-card";
import { ProductCard } from "@/components/product/product-card";
import { GuideCard } from "@/components/buying-guide/guide-card";
import { ContentCTA } from "@/components/content/content-cta";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "GearCurator | Aesthetic Home Setup Inspiration & Product Discovery",
  description: "Discover beautiful products, inspiring setups, and curated finds for creating your perfect space.",
  alternates: {
    canonical: "https://gearcurator.com",
  },
  openGraph: {
    title: "GearCurator | Aesthetic Home Setup Discovery",
    description: "Create a home you'll love coming home to with curated home finds and interior setups.",
    url: "https://gearcurator.com",
    siteName: "GearCurator",
    locale: "en_US",
    type: "website",
  },
};

export default async function Home() {
  const [featuredProducts, allProducts, rooms, aesthetics, setups, buyingGuides] = await Promise.all([
    getFeaturedProducts(),
    getProducts(),
    getRooms(),
    getAesthetics(),
    getSetups(),
    getBuyingGuides(),
  ]);

  const trendingProducts = allProducts.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* 1. Hero Section — Modern Cyber-Tech & Gadgets */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 md:py-28 lg:py-36 border-b border-slate-800/60">
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0" />
        
        <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-400 uppercase shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Gen Tech & Innovations</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.08] text-slate-100">
              Upgrade Your Life With <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Cutting-Edge Gadgets.</span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
              Explore curated high-tech gear, futuristic home automation, workspace upgrades, and hands-on gadget reviews.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/products"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 text-xs font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all uppercase tracking-wider shadow-lg shadow-emerald-500/25"
              >
                Explore Latest Gadgets
              </Link>
              <Link
                href="/setups"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-7 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all uppercase tracking-wider backdrop-blur-md"
              >
                View Smart Setups
              </Link>
            </div>
          </div>

          {/* Large Tech Hero Media */}
          <div className="lg:col-span-5 relative aspect-4/5 w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1000&auto=format&fit=crop&q=80"
              alt="High tech gadgets, futuristic electronic hardware and smart devices"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Featured Innovation</span>
              <h4 className="text-sm font-bold text-white mt-1">Smart Desk & Ambient Ecosystems 2026</h4>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Shop by Room Section */}
      <Section variant="muted" className="py-16">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200/80 pb-5">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">Room Categories</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display">Shop by Room</h2>
            </div>
            <Link
              href="/rooms"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-stone-600 focus-ring rounded"
            >
              <span>Explore All Rooms</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.slice(0, 8).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Find Your Aesthetic Section */}
      <Section variant="white" className="py-16">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200/80 pb-5">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">Design Styles & Moodboards</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display">Find Your Aesthetic</h2>
            </div>
            <Link
              href="/aesthetics"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-stone-600 focus-ring rounded"
            >
              <span>Browse All Styles</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {aesthetics.slice(0, 8).map((aesthetic) => (
              <AestheticCard key={aesthetic.id} aesthetic={aesthetic} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Shop the Setup Collections */}
      <Section variant="muted" className="py-16">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200/80 pb-5">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">Editorial Moodboards</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display">Shop the Setup</h2>
            </div>
            <Link
              href="/setups"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-stone-600 focus-ring rounded"
            >
              <span>View All Setups</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {setups.map((setup) => (
              <SetupCard key={setup.id} setup={setup} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Trending Home Finds */}
      <Section variant="white" className="py-16">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200/80 pb-5">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">Curated Amazon Finds</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display">Trending Home Finds</h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-stone-600 focus-ring rounded"
            >
              <span>Shop All Finds</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Editorial Buying Guides */}
      <Section variant="muted" className="py-16">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200/80 pb-5">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">Space Planning Solutions</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display">Latest Buying Guides</h2>
            </div>
            <Link
              href="/buying-guides"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-stone-600 focus-ring rounded"
            >
              <span>All Buying Guides</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {buyingGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Newsletter Section */}
      <Section variant="white" className="pt-0">
        <Container>
          <ContentCTA />
        </Container>
      </Section>
    </div>
  );
}

