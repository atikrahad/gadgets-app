export const siteConfig = {
  name: "GadgetNexus",
  description: "Curated, high-performance tech gadgets, smart home innovations, and setup essentials.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gadgetnexus.com",
  ogImage: "https://gadgetnexus.com/og.jpg",
  author: "GadgetNexus Editorial Team",
  affiliateDisclosure: "GadgetNexus participates in affiliate programs including Amazon Associates. We may earn a commission on purchases made through links on our site at no additional cost to you.",
  
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Gadgets", href: "/products" },
    { title: "Smart Categories", href: "/rooms" },
    { title: "Tech Aesthetics", href: "/aesthetics" },
    { title: "Buying Guides", href: "/buying-guides" },
    { title: "Desk & Smart Setups", href: "/setups" },
    { title: "Search", href: "/search" },
  ],
  
  footerLinks: {
    editorial: [
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Testing Methodology", href: "/about#standards" },
    ],
    legal: [
      { title: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
  
  marketplaces: [
    { code: "US", name: "United States", defaultTag: "gadgetnexus-20" },
    { code: "UK", name: "United Kingdom", defaultTag: "gadgetnexus-21" },
    { code: "DE", name: "Germany", defaultTag: "gadgetnexusde-21" },
    { code: "CA", name: "Canada", defaultTag: "gadgetnexusca-20" },
  ],
};
