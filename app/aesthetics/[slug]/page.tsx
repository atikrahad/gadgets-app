import Image from "next/image";
import { notFound } from "next/navigation";
import { getAestheticBySlug } from "@/lib/services/home-setup";
import { getProducts } from "@/lib/services/product";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/product/product-card";

interface AestheticPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AestheticPageProps) {
  const { slug } = await params;
  const aesthetic = await getAestheticBySlug(slug);
  if (!aesthetic) return { title: "Aesthetic Not Found" };

  return {
    title: `${aesthetic.name} Home Decor & Setup Products | GearCurator`,
    description: aesthetic.description || `Discover curated ${aesthetic.name} home products.`,
  };
}

export default async function AestheticDetailPage({ params }: AestheticPageProps) {
  const { slug } = await params;
  const aesthetic = await getAestheticBySlug(slug);
  if (!aesthetic) notFound();

  const allProducts = await getProducts();
  const aestheticProducts = allProducts.filter((p) => p.aesthetics?.some((a) => a.slug === aesthetic.slug));

  return (
    <div className="space-y-12">
      {/* Aesthetic Hero */}
      <section className="relative bg-neutral-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/60 z-10" />
        {aesthetic.image && (
          <Image
            src={aesthetic.image}
            alt={aesthetic.name}
            fill
            className="object-cover opacity-40 z-0"
            priority
          />
        )}
        <Container className="relative z-20 space-y-4 max-w-3xl text-center mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Aesthetic Style Mood
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display text-white">
            {aesthetic.name}
          </h1>
          {aesthetic.description && (
            <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">
              {aesthetic.description}
            </p>
          )}
        </Container>
      </section>

      {/* Aesthetic Products Grid */}
      <Section variant="white" className="py-12">
        <Container className="space-y-8">
          <div className="border-b border-neutral-200/80 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-neutral-900">
              Curated {aesthetic.name} Products
            </h2>
          </div>

          {aestheticProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aestheticProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 italic">
              Curated finds for this aesthetic will be imported shortly.
            </p>
          )}
        </Container>
      </Section>
    </div>
  );
}
