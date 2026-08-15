import { getSetups } from "@/lib/services/home-setup";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SetupCard } from "@/components/setup/setup-card";

export const metadata = {
  title: "Shop the Setup | Editorial Home & Desk Inspiration Collections",
  description: "Browse editorial room collections and shop complete setups like Minimal Home Office and Japandi Bedroom.",
};

export default async function SetupsPage() {
  const setups = await getSetups();

  return (
    <Section variant="white" className="py-12 md:py-20">
      <Container className="space-y-10">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Editorial Collections
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-neutral-900">
            Shop the Setup
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed font-light">
            Explore curated room mood boards and shop all compatible products used in each space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {setups.map((setup) => (
            <SetupCard key={setup.id} setup={setup} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
