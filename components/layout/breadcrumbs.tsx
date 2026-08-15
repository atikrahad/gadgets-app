import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex py-4 text-neutral-500 text-xs sm:text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5 mx-1 text-neutral-400" />
              {isLast || !item.href ? (
                <span className="font-medium text-neutral-900 truncate max-w-[180px] sm:max-w-[300px]">
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-neutral-900 transition-colors truncate max-w-[180px] sm:max-w-[300px]"
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
