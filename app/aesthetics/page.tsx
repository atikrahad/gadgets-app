import { getAesthetics } from "@/lib/services/home-setup";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AestheticCard } from "@/components/aesthetic/aesthetic-card";

export const metadata = {
  title: "Explore Aesthetic Styles & Moodboards | GearCurator",
  description: "Browse home aesthetics including Minimalist, Cozy, Japandi, Scandinavian, Boho, Warm Neutral, and Dark & Moody.",
};

export default async function AestheticsPage() {
  const aesthetics = await getAesthetics();

  return (
    <Section variant="white" className="py-12 md:py-20">
      <Container className="space-y-10">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Moodboard & Style Direction
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-neutral-900">
            Find Your Aesthetic
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed font-light">
            Discover design styles tailored to your taste and find compatible products that fit together seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {aesthetics.map((aesthetic) => (
            <AestheticCard key={aesthetic.id} aesthetic={aesthetic} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
