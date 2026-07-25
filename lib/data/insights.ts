export const featuredPost = {
  tag: "Engineering",
  date: "Jun 2026",
  title: "Why we design the data model before anything else",
  excerpt:
    "Screens change weekly. Data models are forever. The order in which you make decisions is the closest thing engineering has to fate.",
  imgId: "featured-post",
  imgHint: "Featured article visual",
} as const;

export const insightPosts = [
  {
    imgId: "post-ai",
    tag: "AI",
    date: "May 2026",
    title: "Shipping AI features that survive contact with real users",
    excerpt:
      "The demo is the easy part. What happens when ten thousand people type things you never imagined?",
  },
  {
    imgId: "post-e2e",
    tag: "Studio",
    date: "Apr 2026",
    title: "What 'end to end' actually means when we say it",
    excerpt:
      "Everyone claims it. Here's the checklist we hold ourselves to, phase by phase.",
  },
  {
    imgId: "post-scale",
    tag: "Engineering",
    date: "Mar 2026",
    title: "Lessons from scaling one platform to 100+ enterprise tenants",
    excerpt: "Multi-tenancy decisions we got right, and two we had to unwind.",
  },
  {
    imgId: "post-voice",
    tag: "AI",
    date: "Feb 2026",
    title: "Building a voice agent that knows when to shut up",
    excerpt:
      "Latency, interruptions and the social rules of a phone call, as engineering problems.",
  },
  {
    imgId: "post-maestro",
    tag: "Maestro",
    date: "Jan 2026",
    title: "Teaching systems thinking, not syntax",
    excerpt: "Why Maestro's curriculum starts with a whiteboard, not an editor.",
  },
  {
    imgId: "post-boring",
    tag: "Engineering",
    date: "Dec 2025",
    title: "The case for boring technology in exciting products",
    excerpt: "Novelty is a budget. Spend it where your users can feel it.",
  },
] as const;
