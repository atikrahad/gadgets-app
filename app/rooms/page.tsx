import Link from "next/link";
import { getRooms } from "@/lib/services/home-setup";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { RoomCard } from "@/components/room/room-card";

export const metadata = {
  title: "Shop by Room | Aesthetic Home Setup Inspiration",
  description: "Browse room-by-room home inspiration including Bedroom, Home Office, Living Room, Kitchen, and more.",
};

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <Section variant="white" className="py-12 md:py-20">
      <Container className="space-y-10">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Spatial Discovery
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-neutral-900">
            Shop by Room
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed font-light">
            Explore curated room categories designed for comfort, aesthetics, and everyday harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
