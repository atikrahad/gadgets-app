import { Metadata } from "next";
import { searchProducts, getFeaturedProducts } from "@/lib/services/product";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Search } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || "";
  return {
    title: q ? `Search results for "${q}"` : "Search Gear",
    description: `Search our independent reviews and product recommendations for the best gear.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";

  // Perform search or load featured fallbacks
  const results = query ? await searchProducts(query) : [];
  const featured = !query ? await getFeaturedProducts() : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs items={[{ title: "Search" }]} />

      <div className="border-b border-neutral-100 pb-5 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {query ? `Search Results for "${query}"` : "Search Products"}
        </h1>
        
        {/* Simple search bar form inside the page */}
        <form action="/search" method="GET" className="max-w-md relative flex items-center">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search chairs, keyboards, audio..."
            className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-4 pl-10 text-sm focus:border-neutral-900 focus:outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
        </form>
      </div>

      <section className="space-y-6">
        {query ? (
          <>
            <h2 className="text-lg font-bold text-neutral-800">
              Found {results.length} matching products
            </h2>
            <ProductGrid products={results} />
          </>
        ) : (
          <div className="space-y-8">
            <div className="rounded-xl border border-dashed border-neutral-200 p-12 text-center text-neutral-500">
              <Search className="h-8 w-8 mx-auto text-neutral-300 mb-3" />
              <p className="text-sm font-medium">Enter a search query above to explore our review library.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-800">Popular Spotlight Picks</h2>
              <ProductGrid products={featured.slice(0, 3)} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
