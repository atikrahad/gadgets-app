import Link from "next/link";
import Image from "next/image";
import { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group relative block aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {room.image ? (
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
      
      <div className="absolute bottom-0 inset-x-0 p-6 space-y-1.5 text-white">
        <h3 className="text-xl font-bold font-display tracking-tight text-white group-hover:text-amber-200 transition-colors">
          {room.name}
        </h3>
        {room.description && (
          <p className="text-xs text-neutral-300 line-clamp-2 font-sans leading-relaxed">
            {room.description}
          </p>
        )}
        <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
          <span>Explore Room</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
