export const siteConfig = {
  name: "Levantate Labs",
  shortName: "Levantate",
  tagline:
    "Engineering studio. Web platforms, AI systems, blockchain — built end to end.",
  description:
    "Levantate Labs designs and builds web platforms, AI systems and enterprise software — end to end, as one accountable team.",
  email: "contact@levantate.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://levantate.in",
  locale: "en_US",
  slotsNote: "Two project slots open this quarter",
  copyright: "© 2026 Levantate Labs",
  markline: "Engineered to last.",
  keywords: [
    "Levantate Labs",
    "software engineering studio",
    "web platforms",
    "AI systems",
    "machine learning",
    "enterprise software",
    "blockchain",
    "product engineering",
    "custom software development",
  ],
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/levantatelabs",
    },
  ],
} as const;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
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
      "AI & machine learning, web & product engineering, enterprise software, blockchain and AI for SaaS — built end to end by one team.",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/products",
    title: "Products",
    description:
      "Maestro is live. Elevox — our Call AI — is in development. One more stays stealth — the same discipline we sell, applied to our own bets.",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/about",
    title: "About",
    description:
      "A studio run by engineers, not account managers. Small team, senior hands only — from first architecture diagram to production.",
    changeFrequency: "monthly" as const,
    priority: 0.7,
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
