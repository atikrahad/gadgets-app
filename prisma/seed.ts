import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductSource, ProductStatus } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment");
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed...");

  // Clean existing data
  await prisma.productFAQ.deleteMany({});
  await prisma.fAQ.deleteMany({});
  await prisma.comparisonProduct.deleteMany({});
  await prisma.comparison.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.buyingGuideProduct.deleteMany({});
  await prisma.buyingGuide.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.productOffer.deleteMany({});
  await prisma.productCategory.deleteMany({});
  await prisma.productSpecification.deleteMany({});
  await prisma.productFeature.deleteMany({});
  await prisma.productEditorial.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.author.deleteMany({});

  console.log("Cleared existing data.");

  // 1. Seed Authors
  const authorAlex = await prisma.author.create({
    data: {
      name: "Alex Mercer",
      slug: "alex-mercer",
      bio: "Lead Product Analyst at GearCurator. Over a decade of experience testing ergonomics and developer workstations.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  });

  const authorEvelyn = await prisma.author.create({
    data: {
      name: "Dr. Evelyn Vance",
      slug: "evelyn-vance",
      bio: "Workspace Consultant and Ergonomist. Focuses on occupational health and workspace biomechanics.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
  });

  console.log("Seeded authors.");

  // 2. Seed Categories (Nested)
  const catWorkspaces = await prisma.category.create({
    data: {
      name: "Workspaces",
      slug: "workspaces",
      description: "Ergonomic furniture and productivity accessories for home office efficiency.",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80",
      seoTitle: "Best Home Office Gear & Ergonomic Workspaces",
      seoDescription: "Optimize your workspace with expert-tested chairs, desks, keyboards, and monitor setups.",
      published: true,
    },
  });

  const catChairs = await prisma.category.create({
    data: {
      name: "Ergonomic Chairs",
      slug: "ergonomic-chairs",
      description: "Prestige seating to prevent strain and maximize seating comfort.",
      image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80",
      parentId: catWorkspaces.id,
      seoTitle: "Top-Rated Ergonomic Office Chairs Reviewed",
      seoDescription: "In-depth reviews and comparisons of top ergonomic office chairs for lumbar support.",
      published: true,
    },
  });

  const catCoffee = await prisma.category.create({
    data: {
      name: "Specialty Coffee",
      slug: "specialty-coffee",
      description: "Precision brewing instruments for coffee enthusiasts and home baristas.",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop&q=80",
      seoTitle: "Specialty Coffee Brewing Equipment Reviews",
      seoDescription: "Unlock café-quality espresso and pour-overs at home with our tested grinder and machine recommendations.",
      published: true,
    },
  });

  console.log("Seeded nested categories.");

  // 3. Seed Products
  const prodAeron = await prisma.product.create({
    data: {
      title: "Herman Miller Aeron Chair",
      slug: "herman-miller-aeron-chair",
      asin: "B01N0PBE0Y",
      brand: "Herman Miller",
      description: "The gold standard of ergonomic seating. Remastered with a modern suspension mechanism and adjustable PostureFit SL pads.",
      shortDescription: "Iconic mesh ergonomic chair providing elite posture alignment.",
      images: [
        "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80"
      ],
      affiliateUrl: "https://www.amazon.com/dp/B01N0PBE0Y/?tag=gearcurator-20",
      amazonUrl: "https://www.amazon.com/dp/B01N0PBE0Y",
      marketplace: "US",
      status: ProductStatus.PUBLISHED,
      source: ProductSource.MANUAL,
      featured: true,
    },
  });

  const prodKeychron = await prisma.product.create({
    data: {
      title: "Keychron Q1 Max Wireless Keyboard",
      slug: "keychron-q1-max-mechanical-keyboard",
      asin: "B0CQMDRC4L",
      brand: "Keychron",
      description: "A premium solid metal custom mechanical keyboard with gasket mounting, fully customizable switches, and multi-device wireless functionality.",
      shortDescription: "Heavy-duty custom mechanical keyboard for writing perfection.",
      images: [
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80"
      ],
      affiliateUrl: "https://www.amazon.com/dp/B0CQMDRC4L/?tag=gearcurator-20",
      amazonUrl: "https://www.amazon.com/dp/B0CQMDRC4L",
      marketplace: "US",
      status: ProductStatus.PUBLISHED,
      source: ProductSource.MANUAL,
      featured: true,
    },
  });

  const prodOde = await prisma.product.create({
    data: {
      title: "Fellow Ode Brew Grinder Gen 2",
      slug: "fellow-ode-brew-grinder-gen-2",
      asin: "B0BFDGRW9M",
      brand: "Fellow",
      description: "An editorial filter coffee grinder re-engineered with 64mm stainless steel burrs and anti-static control to prevent messy counters.",
      shortDescription: "Ultra-consistent home grinder specialized for pour-overs and drip.",
      images: [
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
      ],
      affiliateUrl: "https://www.amazon.com/dp/B0BFDGRW9M/?tag=gearcurator-20",
      amazonUrl: "https://www.amazon.com/dp/B0BFDGRW9M",
      marketplace: "US",
      status: ProductStatus.PUBLISHED,
      source: ProductSource.MANUAL,
      featured: true,
    },
  });

  console.log("Seeded basic products.");

  // 4. Seed ProductCategory Joins
  await prisma.productCategory.createMany({
    data: [
      { productId: prodAeron.id, categoryId: catChairs.id },
      { productId: prodAeron.id, categoryId: catWorkspaces.id },
      { productId: prodKeychron.id, categoryId: catWorkspaces.id },
      { productId: prodOde.id, categoryId: catCoffee.id },
    ],
  });

  // 5. Seed Product Editorial
  await prisma.productEditorial.create({
    data: {
      productId: prodAeron.id,
      summary: "The ultimate mesh suspension chair for traditional sitting postures.",
      pros: [
        "Unmatched ventilation and breathability",
        "Remarkable spinal sacrum and lumbar alignment",
        "Bulletproof build quality backed by 12-year warranty"
      ],
      cons: [
        "Rigid outer plastic frame forbids slouching or cross-legged seating",
        "High initial retail cost represents major workspace investment"
      ],
      bestFor: "Office workers sitting 8+ hours a day prioritizing long-term back health.",
      notBestFor: "Active sitters who enjoy shifting postures, tucking legs, or lounging.",
      buyingAdvice: "Size B fits the vast majority of users, but consult the sizing grid if you are under 5'2\" or over 6'2\".",
      verdict: "An ergonomic masterpiece that is fully worth its pricing if you value longevity and physical support.",
      recommendation: "Highly Recommended (Platinum Award)",
    },
  });

  await prisma.productEditorial.create({
    data: {
      productId: prodKeychron.id,
      summary: "Enthusiast-level custom acoustic profiles meet seamless daily wireless convenience.",
      pros: [
        "Exquisite acoustic sound profile out-of-the-box",
        "Solid, heavy CNC-machined aluminum weight",
        "Full support for custom layouts via QMK/VIA software"
      ],
      cons: [
        "Tall front height requires a wrist rest to avoid wrist extension",
        "Heavy weight makes it completely unsuitable for portable travel"
      ],
      bestFor: "Developers, writers, and desktop keyboard enthusiasts.",
      notBestFor: "Travelers seeking a lightweight, compact input accessory.",
      buyingAdvice: "Consider selecting the pre-lubricated brown tactile switches if you want satisfying feedback that is office-friendly.",
      verdict: "One of the best pre-built mechanical keyboards on the market, bridging standard retail with high-end custom building.",
      recommendation: "Highly Recommended",
    },
  });

  await prisma.productEditorial.create({
    data: {
      productId: prodOde.id,
      summary: "The benchmark home grinder for clean, sweet, and highly consistent filter brewing.",
      pros: [
        "Excellent particle consistency for pour-over, drip, and French press",
        "Highly effective anti-static ionization reduces grinds mess",
        "Sleek minimalist design coordinates with any high-end kitchen counter"
      ],
      cons: [
        "Cannot grind fine enough for traditional portafilter espresso extractions",
        "Single-dose hopper requires loading coffee for every brew cycle"
      ],
      bestFor: "Pour-over aficionados and drip coffee purists.",
      notBestFor: "Espresso drinkers requiring fine micro-adjustments.",
      buyingAdvice: "Use grind settings between 4 and 6 for standard V60 and Chemex pour-overs.",
      verdict: "The absolute best dedicated filter coffee grinder available for home kitchens.",
      recommendation: "Recommended",
    },
  });

  console.log("Seeded product editorial content.");

  // 6. Seed Product Features
  await prisma.productFeature.createMany({
    data: [
      {
        productId: prodAeron.id,
        name: "PostureFit SL Backrest",
        value: "Dual adjustable pads",
        description: "Stabilizes the sacrum and supports the lumbar region of the spine to mimic natural standing posture.",
      },
      {
        productId: prodAeron.id,
        name: "Pellicle 8Z Mesh",
        value: "8 zones of tension",
        description: "Varying tension zones support the body while allowing air, heat, and moisture to pass through.",
      },
      {
        productId: prodKeychron.id,
        name: "Double Gasket Mount",
        value: "Elastic dampening structure",
        description: "Internal silicone gaskets allow the keyboard structure to flex slightly, softening keypress impacts.",
      },
    ],
  });

  // 7. Seed Product Specifications
  await prisma.productSpecification.createMany({
    data: [
      { productId: prodAeron.id, key: "Warranty", value: "12 Years", group: "Manufacturer Specs" },
      { productId: prodAeron.id, key: "Max Capacity", value: "350 lbs", group: "Manufacturer Specs" },
      { productId: prodKeychron.id, key: "Layout", value: "75% Layout", group: "Technical" },
      { productId: prodKeychron.id, key: "Weight", value: "4.5 lbs (2.0 kg)", group: "Dimensions" },
      { productId: prodOde.id, key: "Burrs Size", value: "64mm burrs", group: "Technical" },
      { productId: prodOde.id, key: "Motor Type", value: "PID controlled", group: "Technical" },
    ],
  });

  // 8. Seed Product Offers (Preparing for multi-marketplaces)
  await prisma.productOffer.createMany({
    data: [
      {
        productId: prodAeron.id,
        marketplace: "US",
        asin: "B01N0PBE0Y",
        price: 1495.00,
        currency: "USD",
        affiliateLink: "https://www.amazon.com/dp/B01N0PBE0Y/?tag=gearcurator-20",
        isAvailable: true,
      },
      {
        productId: prodAeron.id,
        marketplace: "UK",
        asin: "B01N0PBE0Y",
        price: 1150.00,
        currency: "GBP",
        affiliateLink: "https://www.amazon.co.uk/dp/B01N0PBE0Y/?tag=gearcuratoruk-21",
        isAvailable: true,
      },
      {
        productId: prodKeychron.id,
        marketplace: "US",
        asin: "B0CQMDRC4L",
        price: 219.00,
        currency: "USD",
        affiliateLink: "https://www.amazon.com/dp/B0CQMDRC4L/?tag=gearcurator-20",
        isAvailable: true,
      },
    ],
  });

  console.log("Seeded product features, specs, and offers.");

  // 9. Seed Reviews
  await prisma.review.create({
    data: {
      slug: "herman-miller-aeron-chair-editorial-review",
      title: "Herman Miller Aeron Chair Review: Still the Best Office Chair?",
      excerpt: "We spent 6 months sitting in the iconic Aeron chair. Here is our comprehensive verdict on its posture support, build quality, and real-world comfort.",
      content: `## The Gold Standard of Seating

The **Herman Miller Aeron** is perhaps the most famous piece of office furniture in the world. Originally designed by Bill Stumpf and Don Chadwick in 1994, it has been remastered to meet the demands of modern desk workers. 

We tested the Aeron (Size B) over a span of six months to determine if it justifies its high four-figure price tag.

### Design and Materials

The standout feature of the Aeron is its **Pellicle mesh**. Unlike traditional foam chairs, Pellicle allows air, body heat, and water vapor to pass through the seat and backrest, keeping you cool during long working sessions.

The frame is robust, crafted from recycled aluminum and composite plastics. It feels incredibly premium, with smooth adjustments and zero wobbles.

### Ergonomics & Adjustments

The Aeron excels at support. The **PostureFit SL** backrest provides two individual pads that stabilize the sacrum and support the lumbar region. This forces a natural S-shaped spinal alignment.

Adjustments include:
- Seat height
- Tilt tension and limiters
- Seat angle (forward tilt for active typing)
- Fully adjustable armrests (height, depth, and pivot)

### Comfort Verdict

If you sit in a correct, forward-facing posture, the Aeron is unmatched. It holds you in a comfortable, ergonomic position that eliminates back pain and fatigue. However, if you like to sit cross-legged, tuck a leg under, or slouch, the rigid polymer frame boundary will press into your thighs, making it uncomfortable.

### Is it worth it?

Yes. Given the 12-year warranty (covering 24-hour usage) and outstanding ergonomic performance, the Aeron is an investment in your long-term health and productivity.`,
      rating: 4.8,
      verdict: "The benchmark ergonomic workspace upgrade. Highly recommended for professionals sitting 8+ hours a day.",
      productId: prodAeron.id,
      authorId: authorAlex.id,
      isPublished: true,
    },
  });

  console.log("Seeded reviews.");

  // 10. Seed Buying Guides
  const guideOffice = await prisma.buyingGuide.create({
    data: {
      title: "The Best Home Office Gear for Ultimate Productivity and Comfort",
      slug: "best-home-office-gear-ergonomics",
      excerpt: "Struggling with focus or back pain? Our editors curate the absolute best office chairs, keyboards, and accessories to optimize your daily workflow.",
      content: `## Creating a High-Performance Workspace

Your environment directly dictates your focus, energy, and physical comfort. Investing in high-quality home office equipment is not just about luxury—it is about health and productivity.

In this guide, we break down the key components of an optimized desk setup, drawing from our rigorous hands-on reviews.

### 1. The Ergonomic Foundation: The Chair

An ergonomic chair is the most critical element of your setup. You need dynamic support that adapts to your posture as you work.

Our top recommendation is the **Herman Miller Aeron**, which provides incredible support and keeps you cool with mesh fabric.

### 2. The Input Interface: Keyboard

Typing on a generic keyboard can lead to repetitive strain injuries. Custom mechanical keyboards offer better travel, comfort, and customizable layouts.

The **Keychron Q1 Max** provides an incredibly satisfying typing experience and seamless multi-device switching.`,
      featuredImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80",
      authorId: authorAlex.id,
      categoryId: catWorkspaces.id,
      seoTitle: "The Best Ergonomic Home Office Workstation Setup Gear",
      seoDescription: "The definitive editorial buying guide on desks, chairs, and input peripherals for healthy home workstations.",
    },
  });

  await prisma.buyingGuideProduct.createMany({
    data: [
      {
        buyingGuideId: guideOffice.id,
        productId: prodAeron.id,
        rank: 1,
        commentary: "The best chair you can buy. Offers exceptional back and leg support, unmatched longevity, and keeps you sweat-free.",
      },
      {
        buyingGuideId: guideOffice.id,
        productId: prodKeychron.id,
        rank: 2,
        commentary: "A premium solid metal keyboard that makes typing an absolute joy while supporting multiple devices wirelessly.",
      },
    ],
  });

  console.log("Seeded buying guides.");

  // 11. Seed Comparisons
  const compWorkspace = await prisma.comparison.create({
    data: {
      slug: "ergonomic-chair-vs-mechanical-keyboard-investment",
      title: "Workspace Investment: Ergonomic Chair vs. Mechanical Keyboard",
      description: "Which product provides the best return on posture support, comfort, and physical ergonomics?",
    },
  });

  await prisma.comparisonProduct.createMany({
    data: [
      { comparisonId: compWorkspace.id, productId: prodAeron.id, rank: 1 },
      { comparisonId: compWorkspace.id, productId: prodKeychron.id, rank: 2 },
    ],
  });

  // 12. Seed Blog Posts
  await prisma.blogPost.create({
    data: {
      slug: "ergonomic-workspace-myths-debunked",
      title: "5 Ergonomic Workspace Myths That Are Hurting Your Back",
      excerpt: "Think sitting at a perfect 90-degree angle is good for you? Think again. We debunk the common ergonomic myths with science-backed advice.",
      content: `## Rethinking Your Desk Ergonomics

We are often told that the secret to back health is sitting upright at a rigid 90-degree angle. But modern ergonomic science tells a very different story.

In this post, we explore five common desk ergonomic myths that might be doing more harm than good.

### Myth 1: The 90-Degree Angle is Best

Sitting perfectly upright at a 90-degree angle puts excessive stress on your spine. Research indicates that a slightly reclined posture (between 100 to 110 degrees) reduces disc compression and lumbar strain.

### Myth 2: Ergonomic Chairs Solve Everything

While a premium chair like the **Herman Miller Aeron** helps, it is not a cure-all. Movement is the real key to ergonomics. You should stand up, stretch, and walk around for at least 5 minutes every hour.

### Myth 3: More Cushioning Equals More Comfort

Soft, plush seats feel great for the first ten minutes, but offer zero structural support. Over time, your pelvis tilts backward, causing your spine to slouch. Firm, supportive materials (like mesh or high-density foam) are far superior for long days.`,
      image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=800&auto=format&fit=crop&q=80",
      authorId: authorEvelyn.id,
    },
  });

  console.log("Seeded blog posts.");

  // 13. Seed FAQs
  const faqErgo = await prisma.fAQ.create({
    data: {
      question: "Why should I choose mesh over padding for an office chair?",
      answer: "Mesh seating distributes weight more evenly, doesn't compress or lose support shape over time, and allows excellent heat dissipation preventing sweat buildup.",
      slug: "mesh-vs-padded-office-chairs",
    },
  });

  await prisma.productFAQ.create({
    data: {
      productId: prodAeron.id,
      faqId: faqErgo.id,
    },
  });

  console.log("Seeded FAQs.");
  console.log("Database seed successfully completed!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
