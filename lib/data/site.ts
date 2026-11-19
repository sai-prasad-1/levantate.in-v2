export const siteConfig = {
  name: "Levantate Labs",
  shortName: "Levantate",
  tagline: "Product studio. We build products like they're our own.",
  description:
    "Levantate Labs is a product studio. We take products from first idea to running in production for our clients, and we build and run our own: Maestro and Cronpay.",
  email: "contact@levantate.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.levantate.in",
  locale: "en_US",
  slotsNote: "Two project slots open this quarter",
  copyright: "© 2026 Levantate Labs",
  markline: "Engineered to last.",
  keywords: [
    "Levantate Labs",
    "product studio",
    "product engineering studio",
    "end-to-end product development",
    "MVP development",
    "SaaS development",
    "AI product development",
    "AI agents and automation",
    "web application development",
    "enterprise software development",
    "Maestro",
    "Cronpay",
  ],

  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/levantatelabs",
    },
  ],
} as const;

export const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Client work", href: "/work" },
  { label: "How we work", href: "/#process" },
  { label: "Insights", href: "/insights" },
] as const;

export const siteRoutes = [
  {
    path: "/",
    title: "Levantate Labs",
    description: siteConfig.description,
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/services",
    title: "Services",
    description:
      "Product strategy and design, web and product engineering, AI and machine learning, AI for SaaS, enterprise software and blockchain, built end to end by one team.",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/products",
    title: "Products",
    description:
      "Our own products, built and run by us: Maestro and its Simulation Lab, Cronpay, Elevox in development, and one more in stealth.",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/work",
    title: "Client work",
    description:
      "Products, platforms and sites we have built with our clients, from an enterprise AI interview platform to brand sites for security, recruitment and film studios.",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/insights",
    title: "Insights",
    description:
      "Notes from the studio — what we learn building systems, written down while it's still fresh.",
    changeFrequency: "weekly" as const,
    priority: 0.6,
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Tell us what you're building. Levantate Labs replies within two working days.",
    changeFrequency: "yearly" as const,
    priority: 0.8,
  },
] as const;

export type NavHref = (typeof navLinks)[number]["href"] | "/contact" | "/";
