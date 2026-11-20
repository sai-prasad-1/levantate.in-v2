export type ServiceVisualKind = "strategy" | "web" | "ai" | "saas" | "enterprise" | "blockchain";

export type Service = {
  id: string;
  num: string;
  /** Caps part of the title. */
  title: string;
  /** Serif italic phrase that closes the title. */
  accent: string;
  /** Short label used in the jump links. */
  short: string;
  body: string;
  items: readonly string[];
  visual: ServiceVisualKind;
};

export const services: readonly Service[] = [
  {
    id: "strategy",
    num: "01",
    title: "Product strategy",
    accent: "& design.",
    short: "Strategy & design",
    body: "We work out what to build before we build it: research, scoping, UX and interface design, so the expensive decisions get made on purpose.",
    items: ["Discovery", "Product architecture", "UX & interface", "Prototypes"],
    visual: "strategy",
  },
  {
    id: "web",
    num: "02",
    title: "Web & product",
    accent: "engineering.",
    short: "Web & product engineering",
    body: "Full platforms: architecture, build, launch, and the iteration after launch. Frontend to infrastructure, one team.",
    items: [
      "Product architecture & design",
      "Full-stack web applications",
      "APIs & integrations",
      "Performance & reliability",
    ],
    visual: "web",
  },
  {
    id: "ai",
    num: "03",
    title: "AI & machine",
    accent: "learning.",
    short: "AI & machine learning",
    body: "Automation, assistants and ML pipelines built for production, not demos. We handle the data, the models, and the software around them.",
    items: [
      "Workflow automation & agents",
      "ML pipelines & data infrastructure",
      "Voice & conversational systems",
      "Evaluation, monitoring, iteration",
    ],
    visual: "ai",
  },
  {
    id: "saas",
    num: "04",
    title: "AI for",
    accent: "SaaS.",
    short: "AI for SaaS",
    body: "Embedding intelligence into products people already use: designed, built and maintained as part of your product, not bolted on.",
    items: [
      "AI feature design & integration",
      "RAG & retrieval systems",
      "Fine-tuning & model selection",
      "Cost & latency engineering",
    ],
    visual: "saas",
  },
  {
    id: "enterprise",
    num: "05",
    title: "Enterprise",
    accent: "software.",
    short: "Enterprise software",
    body: "Systems that survive procurement, compliance reviews and multi-tenant scale. We’ve done it: our builds serve 25+ enterprises today.",
    items: [
      "Multi-tenant SaaS platforms",
      "Admin & internal tooling",
      "Security & compliance readiness",
      "Migrations & modernisation",
    ],
    visual: "enterprise",
  },
  {
    id: "blockchain",
    num: "06",
    title: "Blockchain,",
    accent: "made usable.",
    short: "Blockchain",
    body: "Smart contracts, infrastructure, and the product layer that makes them usable by real people. It’s the same thinking behind Cronpay, our own crypto checkout.",
    items: [
      "Smart contract development",
      "Protocol & infrastructure work",
      "Wallets & on-chain products",
      "Audit preparation",
    ],
    visual: "blockchain",
  },
];

export const processPhases = [
  {
    num: "01",
    span: "Weeks 1–2",
    title: "Understand",
    body: "We sit with the problem until we can explain it back better than we heard it.",
    color: "var(--s0)",
    left: "0%",
    width: "17%",
  },
  {
    num: "02",
    span: "Weeks 2–4",
    title: "Design",
    body: "Data models, boundaries, interfaces and screens. The costly decisions, made deliberately.",
    color: "var(--s1)",
    left: "9%",
    width: "25%",
  },
  {
    num: "03",
    span: "The long middle",
    title: "Ship",
    body: "Small releases from early on, so you’re using real software while it’s still being built.",
    color: "var(--s2)",
    left: "25%",
    width: "58%",
  },
  {
    num: "04",
    span: "Ongoing",
    title: "Run",
    body: "We stay after launch: monitoring, iteration and keeping the system healthy.",
    color: "var(--s3)",
    left: "66%",
    width: "34%",
  },
] as const;
