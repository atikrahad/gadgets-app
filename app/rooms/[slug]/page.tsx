import Image from "next/image";
import { notFound } from "next/navigation";
import { getRoomBySlug } from "@/lib/services/home-setup";
import { getProducts } from "@/lib/services/product";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/product/product-card";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return { title: "Room Not Found" };

  return {
    title: `${room.name} Setups & Aesthetic Finds | GearCurator`,
    description: room.description || `Discover curated ${room.name} products and setups.`,
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) notFound();

  const allProducts = await getProducts();
  const roomProducts = allProducts.filter((p) => p.rooms?.some((r) => r.slug === room.slug));

  return (
    <div className="space-y-12">
      {/* Room Hero */}
      <section className="relative bg-neutral-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/60 z-10" />
        {room.image && (
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover opacity-40 z-0"
            priority
          />
        )}
        <Container className="relative z-20 space-y-4 max-w-3xl text-center mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Room Category
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display text-white">
            {room.name}
          </h1>
          {room.description && (
            <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">
              {room.description}
            </p>
          )}
        </Container>
      </section>

      {/* Recommended Products */}
      <Section variant="white" className="py-12">
        <Container className="space-y-8">
          <div className="border-b border-neutral-200/80 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-neutral-900">
              Curated {room.name} Products
            </h2>
          </div>

          {roomProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {roomProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 italic">
              New imported products for this room are coming soon through automated curation.
            </p>
          )}
        </Container>
      </Section>
    </div>
  );
}
