import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/services/blog";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Clock, User, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function renderSimpleMarkdown(markdown: string) {
  return markdown.split("\n\n").map((block, idx) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      return (
        <h4 key={idx} className="text-lg font-bold text-neutral-900 mt-6 mb-3">
          {trimmed.replace("### ", "")}
        </h4>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h3 key={idx} className="text-xl font-bold text-neutral-900 mt-8 mb-4 border-b border-neutral-100 pb-2">
          {trimmed.replace("## ", "")}
        </h3>
      );
    }
    
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pIdx} className="font-bold text-neutral-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <p key={idx} className="text-xs sm:text-sm text-neutral-600 leading-relaxed my-4">
        {content}
      </p>
    );
  });
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { title: "Blog", href: "/blog" },
          { title: post.title },
        ]}
      />

      <article className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              By {post.author?.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50 shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="border-t border-neutral-100 pt-6">
          {renderSimpleMarkdown(post.content)}
        </div>
      </article>

      {/* Back button */}
      <div className="pt-8 border-t border-neutral-100">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.image || undefined,
            "datePublished": post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.author,
            },
            "description": post.excerpt,
          }),
        }}
      />
    </div>
  );
}
