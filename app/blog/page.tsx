import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/services/blog";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Clock, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "GearCurator Editorial Blog",
  description: "Read our latest articles, ergonomic science deep-dives, setup guidelines, and industry news from the GearCurator editorial team.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs items={[{ title: "Blog" }]} />

      <div className="border-b border-neutral-100 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Editorial Blog
        </h1>
        <p className="mt-2 text-sm text-neutral-500 max-w-2xl leading-relaxed">
          Behind-the-scenes thoughts, technical guides, ergonomic tips, and setup advice from industry practitioners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden shadow-sm hover:border-neutral-200 hover:shadow-md transition-all flex flex-col h-full"
          >
            {/* Thumbnail */}
            {post.image && (
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            )}
            
            {/* Details */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author?.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-emerald-600 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                
                <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 transition-colors">
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
