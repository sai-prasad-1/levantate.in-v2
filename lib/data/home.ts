export const marqueeItems = [
  "Web platforms",
  "AI systems",
  "Enterprise software",
  "Blockchain",
  "ML pipelines",
  "Web platforms",
  "AI systems",
  "Enterprise software",
  "Blockchain",
  "ML pipelines",
] as const;

export const homeServices = [
  {
    num: "01",
    title: "AI & machine learning",
    sub: "Automation, assistants and ML pipelines built for production — not demos.",
  },
  {
    num: "02",
    title: "Web & product engineering",
    sub: "Full platforms: architecture, build, launch, and the iteration after.",
  },
  {
    num: "03",
    title: "Enterprise software",
    sub: "Systems that survive procurement, compliance and hundred-tenant scale.",
  },
  {
    num: "04",
    title: "Blockchain",
    sub: "Contracts, infrastructure, and the product layer that makes them usable.",
  },
  {
    num: "05",
    title: "AI for SaaS",
    sub: "Embedding intelligence into products people already use.",
  },
] as const;

export const homePhases = [
  {
    num: "01",
    span: "Weeks 1–2",
    title: "Understand",
    body: "We sit with the problem until we can explain it back better than we heard it. Architecture starts here.",
    bg: "#EFEAE0",
  },
  {
    num: "02",
    span: "Weeks 2–4",
    title: "Design",
    body: "Data models, boundaries, interfaces — the expensive decisions get made deliberately.",
    bg: "#E9E0D2",
  },
  {
    num: "03",
    span: "The long middle",
    title: "Ship",
    body: "Small releases from early on. Working software in weeks, not a reveal at the end.",
    bg: "#E3E6DC",
  },
  {
    num: "04",
    span: "Ongoing",
    title: "Run",
    body: "We stay after launch — monitoring, iteration, and keeping systems healthy.",
    bg: "#EDE6DC",
  },
] as const;

export const homePosts = [
  {
    imgId: "post-1",
    tag: "Engineering",
    date: "Jun 2026",
    title: "Why we design the data model before anything else",
  },
  {
    imgId: "post-2",
    tag: "AI",
    date: "May 2026",
    title: "Shipping AI features that survive contact with real users",
  },
  {
    imgId: "post-3",
    tag: "Studio",
    date: "Apr 2026",
    title: "What 'end to end' actually means when we say it",
  },
] as const;

export const homeStats = [
  { value: 100, suffix: "+", label: "Enterprises served" },
  { value: 12, suffix: "+", label: "Systems shipped" },
  { value: 3, suffix: "", label: "Products of our own" },
  { value: 2, suffix: "", label: "Slots open this quarter" },
] as const;

export const homeChips = [
  "Web platforms",
  "AI systems",
  "Blockchain",
  "Enterprise",
] as const;
