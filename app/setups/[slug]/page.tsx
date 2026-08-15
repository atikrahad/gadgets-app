import Image from "next/image";
import { notFound } from "next/navigation";
import { getSetupBySlug } from "@/lib/services/home-setup";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/product/product-card";

interface SetupDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SetupDetailPageProps) {
  const { slug } = await params;
  const setup = await getSetupBySlug(slug);
  if (!setup) return { title: "Setup Not Found" };

  return {
    title: `${setup.title} — Shop the Setup | GearCurator`,
    description: setup.description,
  };
}

export default async function SetupDetailPage({ params }: SetupDetailPageProps) {
  const { slug } = await params;
  const setup = await getSetupBySlug(slug);
  if (!setup) notFound();

  return (
    <div className="space-y-12">
      {/* Setup Hero */}
      <section className="relative bg-neutral-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950/70 z-10" />
        <Image
          src={setup.heroImage}
          alt={setup.title}
          fill
          className="object-cover opacity-50 z-0"
          priority
        />
        <Container className="relative z-20 space-y-4 max-w-3xl text-center mx-auto">
          {setup.room && (
            <span className="inline-block rounded-full bg-stone-800/90 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-200 backdrop-blur-md">
              {setup.room.name}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-extrabold font-display text-white">
            {setup.title}
          </h1>
          <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">
            {setup.description}
          </p>

          {setup.aesthetics && setup.aesthetics.length > 0 && (
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {setup.aesthetics.map((a) => (
                <span key={a.id} className="rounded-md bg-white/10 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur-md">
                  #{a.name}
                </span>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Included Products in this Setup */}
      <Section variant="white" className="py-12">
        <Container className="space-y-8">
          <div className="border-b border-neutral-200/80 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-neutral-900">
              Products in This Setup
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Curated items to replicate this aesthetic look in your home.
            </p>
          </div>

          {setup.products && setup.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {setup.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 italic">
              No products associated with this setup yet.
            </p>
          )}
        </Container>
      </Section>
    </div>
  );
}
