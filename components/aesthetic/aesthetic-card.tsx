import Link from "next/link";
import Image from "next/image";
import { Aesthetic } from "@/types";

interface AestheticCardProps {
  aesthetic: Aesthetic;
}

export function AestheticCard({ aesthetic }: AestheticCardProps) {
  return (
    <Link
      href={`/aesthetics/${aesthetic.slug}`}
      className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {aesthetic.image ? (
        <Image
          src={aesthetic.image}
          alt={aesthetic.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-200" />
      )}
      <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/30 transition-colors" />
      
      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white space-y-1">
        <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase">
          Style Mood
        </span>
        <h3 className="text-lg font-bold font-display tracking-tight text-white">
          {aesthetic.name}
        </h3>
        {aesthetic.description && (
          <p className="text-xs text-neutral-200 line-clamp-2 leading-relaxed">
            {aesthetic.description}
          </p>
        )}
      </div>
    </Link>
  );
}
