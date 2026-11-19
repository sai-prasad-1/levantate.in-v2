/* ---------------------------------------------------------------------------
   Client work page (/work)
   ------------------------------------------------------------------------ */

export type CaseCover = "interview" | "exploitless" | "image";

export type CaseStudy = {
  id: string;
  num: string;
  name: string;
  kind: string;
  title: string;
  body: string;
  detail: string;
  did: readonly string[];
  cover: CaseCover;
  image?: { src: string; alt: string; position: string; bordered?: boolean };
  status?: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    id: "case-interview",
    num: "01",
    name: "AI interview platform",
    kind: "Product",
    title: "Hiring systems that run at enterprise scale",
    body: "Assessment engine, scheduling, evaluation pipelines and admin tooling: a full product build, now used across a large enterprise client base.",
    detail:
      "End to end: architecture, product, engineering and infrastructure. Built to survive real hiring volume, not a demo.",
    did: ["Architecture", "Product", "Engineering", "Infrastructure"],
    cover: "interview",
  },
  {
    id: "case-exploitless",
    num: "02",
    name: "Exploitless",
    kind: "Website & SEO",
    title: "A website for cybersecurity and contract auditing",
    body: "Positioning, structure, SEO, AI search readiness and Google Business Profile setup for a cybersecurity firm.",
    detail:
      "From first architecture to live presence: platform, discovery and the operational pieces that make a security brand findable.",
    did: ["Positioning", "Website", "SEO", "AI search readiness", "Google Business Profile"],
    cover: "exploitless",
  },
  {
    id: "case-vertin",
    num: "03",
    name: "Vertin Recruitment",
    kind: "Website",
    title: "A site for a top-tier recruitment agency",
    body: "Clear positioning, candidate and client journeys, and a digital presence that matches a premium hiring brand.",
    detail:
      "Designed and engineered as a proper recruitment surface: credibility first, conversion-ready, easy to update.",
    did: ["Positioning", "Candidate & client journeys", "Design", "Engineering"],
    cover: "image",
    image: {
      src: "/images/vertin.jpg",
      alt: "Vertin Recruitment website: finding elite engineers for Web3, AI and Fintech",
      position: "50% 30%",
    },
  },
  {
    id: "case-crestline",
    num: "04",
    name: "Crestline Creatives",
    kind: "Brand & website",
    title: "A brand and website for a film-first creative studio",
    body: "A full visual system and site for a studio that plans, shoots, edits and grows Instagram and YouTube channels. Every format stands side by side, and their tops form the ridge.",
    detail: "The design is done. Content goes in next.",
    did: ["Brand system", "Logo", "Website design", "Engineering"],
    cover: "image",
    image: {
      src: "/images/crestline.jpg",
      alt: "Crestline Creatives website: every video format standing side by side as a lit ridge",
      position: "50% 40%",
      bordered: true,
    },
    status: "In development",
  },
];

export const clientQuotes = [
  {
    initials: "KV",
    quote:
      "Amazing experience working with Levantate. I run a cybersecurity company and they have developed a great platform for us. They made sure it’s SEO optimised, adjusted it for AI search engines, and created and set up our Google Business Profile.",
    name: "Kiril Veretin",
    role: "CEO, Exploitless & Vertin Recruitment",
  },
  {
    initials: "AB",
    quote:
      "The team delivered exceptional digital marketing services for our business with the utmost professionalism. Their strategic approach, attention to detail and commitment to results were evident throughout. We are grateful for the measurable impact they made on our brand visibility.",
    name: "Abin Baby",
    role: "Resort owner, Idukki",
  },
] as const;
