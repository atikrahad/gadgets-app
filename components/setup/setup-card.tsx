import Link from "next/link";
import Image from "next/image";
import { Setup } from "@/types";

interface SetupCardProps {
  setup: Setup;
}

export function SetupCard({ setup }: SetupCardProps) {
  return (
    <Link
      href={`/setups/${setup.slug}`}
      className="group relative block rounded-3xl border border-neutral-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
        <Image
          src={setup.heroImage}
          alt={setup.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {setup.room && (
          <span className="absolute top-4 left-4 rounded-full bg-neutral-900/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-amber-200 uppercase tracking-widest">
            {setup.room.name}
          </span>
        )}
      </div>

      <div className="p-6 space-y-3">
        {setup.aesthetics && setup.aesthetics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {setup.aesthetics.map((a) => (
              <span key={a.id} className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                #{a.name}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-bold font-display text-neutral-900 group-hover:text-stone-700 transition-colors">
          {setup.title}
        </h3>
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
          {setup.description}
        </p>
        <div className="pt-2 flex items-center justify-between text-xs font-bold text-neutral-900">
          <span>Shop This Look</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
