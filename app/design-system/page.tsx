import React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

// Category Components
import { CategoryGrid } from "@/components/category/category-grid";
import { CategoryHeader } from "@/components/category/category-header";

// Product Components
import { ProductGrid } from "@/components/product/product-grid";
import { ProductHero } from "@/components/product/product-hero";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductRating } from "@/components/product/product-rating";
import { ProductBadge } from "@/components/product/product-badge";
import { ProductPrice } from "@/components/product/product-price";
import { ProductCTA } from "@/components/product/product-cta";
import { ProductFeatureList } from "@/components/product/product-feature-list";
import { ProductSpecifications } from "@/components/product/product-specifications";
import { ProsCons } from "@/components/product/pros-cons";
import { VerdictCard } from "@/components/product/verdict-card";
import { RelatedProducts } from "@/components/product/related-products";

// Content Components
import { ArticleHeader } from "@/components/content/article-header";
import { ArticleContent } from "@/components/content/article-content";
import { TableOfContents } from "@/components/content/table-of-contents";
import { AuthorCard } from "@/components/content/author-card";
import { RelatedArticles } from "@/components/content/related-articles";
import { FAQ } from "@/components/content/faq";
import { ContentCTA } from "@/components/content/content-cta";

// Comparison Components
import { ComparisonCard } from "@/components/comparison/comparison-card";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import { ComparisonProduct } from "@/components/comparison/comparison-product";

// Data
import { mockProducts, mockCategories, mockAuthors, mockComparisons, mockBlogPosts } from "@/lib/services/mockData";

export const metadata = {
  title: "Premium Design System | GearCurator",
  description: "Explore the reusable, premium, and fully accessible design system elements for GearCurator.",
};

export default function DesignSystemPage() {
  const sampleProduct = mockProducts[0];
  const sampleCategory = mockCategories[0];
  const sampleAuthor = mockAuthors[0];
  const sampleComparison = mockComparisons[0];

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Design System", href: "/design-system" },
  ];

  const tocItems = [
    { id: "global-layout", text: "Global Layout & Container" },
    { id: "categories", text: "Category Components" },
    { id: "products", text: "Product Components" },
    { id: "content", text: "Content & Typography" },
    { id: "comparison", text: "Comparison Components" },
  ];

  const sampleFaqs = [
    {
      id: "faq-1",
      question: "What makes this design system premium?",
      answer: "We focus on clean typography scales, consistent spacing ratios, subtle box-shadow depth layers, and progressive feature enhancement like CSS text-wrap balancing.",
      slug: "faq-design-system-premium",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "faq-2",
      question: "Are these components fully accessible?",
      answer: "Yes, every component utilizes native HTML semantic structures, has explicit focus ring indicator outlines, and complies with ARIA tab target guidelines.",
      slug: "faq-design-system-accessibility",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <Container className="py-12 space-y-12">
      {/* Design System Hero Header */}
      <div className="space-y-4 border-b border-neutral-100 pb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
          Premium Design System
        </h1>
        <p className="text-base text-neutral-500 max-w-2xl">
          A collection of reusable, highly polished, and fully accessible UI components built for high-performance product discovery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
          <TableOfContents items={tocItems} />
        </aside>

        {/* Components Grid */}
        <main className="lg:col-span-9 space-y-16">
          {/* 1. Global Layout Section */}
          <Section id="global-layout" variant="white" className="rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-xs">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-display border-b border-neutral-100 pb-2">
              1. Global Layout & Container
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Breadcrumbs</span>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <Breadcrumbs items={breadcrumbItems} />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Layout Section & Containment</span>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  This showcase is wrapped inside a centered <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded">Container</code> component with side gutters, organizing components inside standardized vertical margin <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded">Section</code> components.
                </p>
              </div>
            </div>
          </Section>

          {/* 2. Category Components Section */}
          <Section id="categories" variant="white" className="rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-xs">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-display border-b border-neutral-100 pb-2">
              2. Category Components
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Category Header</span>
                <CategoryHeader category={sampleCategory} childCategories={mockCategories.slice(1)} />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Category Grid & Cards</span>
                <CategoryGrid categories={mockCategories} />
              </div>
            </div>
          </Section>

          {/* 3. Product Components Section */}
          <Section id="products" variant="white" className="rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-xs">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-display border-b border-neutral-100 pb-2">
              3. Product Components
            </h2>
            <div className="space-y-12">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Product Hero Header</span>
                <ProductHero product={sampleProduct} />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Product Image Gallery</span>
                <div className="max-w-2xl">
                  <ProductImageGallery images={[sampleProduct.image, ...mockProducts.map(p => p.image)]} title={sampleProduct.title} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visual Tokens */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Badges & Micro-Rating</span>
                  <div className="flex flex-wrap gap-2 items-center p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <ProductBadge variant="editors-choice" />
                    <ProductBadge variant="best-value" />
                    <ProductBadge variant="premium-pick" />
                    <ProductRating rating={4.8} max={5} />
                  </div>
                </div>

                {/* Sizing & Pricing */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Price & CTA Variants</span>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 space-y-4">
                    <ProductPrice price={1495} currency="USD" size="md" />
                    <ProductCTA buyUrl={sampleProduct.buyUrl} variant="primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Pros & Cons Evaluation</span>
                <ProsCons pros={sampleProduct.pros} cons={sampleProduct.cons} />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Product Editorial Verdict</span>
                <VerdictCard
                  editorialScore={sampleProduct.editorialScore}
                  verdict={sampleProduct.aiSummary || ""}
                  recommendation="Highly Recommended"
                  bestFor="Office workers sitting 8+ hours a day prioritizing long-term back health."
                  notBestFor="Active sitters who enjoy shifting postures or sitting cross-legged."
                />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Product Feature List</span>
                <ProductFeatureList
                  features={[
                    { name: "PostureFit SL", value: "Lumbar stabilizer backpad", description: "Stabilizes the sacrum and supports the lumbar region of the spine." },
                    { name: "Pellicle 8Z Mesh", value: "8-zone suspension mesh", description: "Varying tension zones support the body and keep you cool." },
                  ]}
                  layout="grid"
                />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Technical Specifications Table</span>
                <ProductSpecifications
                  specifications={{
                    "Material": "Pellicle Mesh",
                    "Warranty": "12 Years",
                    "Weight Capacity": "350 lbs",
                    "Adjustable Armrests": true,
                    "Tilt Limiter": true,
                  }}
                />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Product Card & Grid Showcase</span>
                <ProductGrid products={mockProducts.slice(0, 3)} />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Related Products Container</span>
                <RelatedProducts products={mockProducts.slice(1, 4)} />
              </div>
            </div>
          </Section>

          {/* 4. Content & Typography Section */}
          <Section id="content" variant="white" className="rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-xs">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-display border-b border-neutral-100 pb-2">
              4. Content & Typography
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Article Header Metadata</span>
                <ArticleHeader
                  title="5 Ergonomic Workspace Myths That Are Hurting Your Back"
                  excerpt="Think sitting at a perfect 90-degree angle is good for you? Think again. We debunk the common ergonomic myths with science-backed advice."
                  category={sampleCategory}
                  author={sampleAuthor}
                  publishedAt={new Date()}
                  readTime="4 min read"
                />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Typography & Article Content</span>
                <ArticleContent
                  content={`## Rethinking Desk Ergonomics

We are often told that the secret to back health is sitting upright at a rigid 90-degree angle. But modern ergonomic science tells a very different story.

- **Myth 1: The 90-Degree Angle is Best**. Research indicates that a slightly reclined posture (between 100 to 110 degrees) reduces disc compression and lumbar strain.
- **Myth 2: Ergonomic Chairs Solve Everything**. Movement is the real key. Stand up and stretch at least 5 minutes every hour.
`}
                />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Author Card Profile</span>
                <AuthorCard author={sampleAuthor} />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Frequently Asked Questions Accordions</span>
                <FAQ faqs={sampleFaqs} />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Related Articles list</span>
                <RelatedArticles articles={mockBlogPosts} />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Newsletter CTA Promo block</span>
                <ContentCTA />
              </div>
            </div>
          </Section>

          {/* 5. Comparison Components Section */}
          <Section id="comparison" variant="white" className="rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-xs">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-display border-b border-neutral-100 pb-2">
              5. Comparison Components
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Comparison Summary Card</span>
                <ComparisonCard comparison={sampleComparison} />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Comparison Row (Winner vs Alternative)</span>
                <div className="space-y-4">
                  <ComparisonProduct
                    product={mockProducts[0]}
                    rank={1}
                    isWinner={true}
                    commentary="Unmatched lumbar posture alignment and cool mesh ventilation. Perfect for 8+ hour work days."
                  />
                  <ComparisonProduct
                    product={mockProducts[1]}
                    rank={2}
                    isWinner={false}
                    commentary="Excellent acoustic typing profile but lacks back and leg alignment features."
                  />
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Comparison Matrix Table</span>
                <ComparisonTable products={mockProducts.slice(0, 3)} />
              </div>
            </div>
          </Section>
        </main>
      </div>
    </Container>
  );
}
