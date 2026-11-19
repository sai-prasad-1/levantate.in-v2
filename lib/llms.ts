import { faqs } from "@/lib/data/faqs";
import { getPublishedInsights } from "@/lib/data/insights-db";
import { productFacts } from "@/lib/data/products";
import { services } from "@/lib/data/services";
import { siteConfig, siteRoutes } from "@/lib/data/site";
import { caseStudies } from "@/lib/data/work";
import { absoluteUrl } from "@/lib/seo";

/*
 * llms.txt (https://llmstxt.org): a plain Markdown summary of the site for AI
 * assistants and agents, plus llms-full.txt with every article in full.
 * Built from the same data as the pages, so it stays current on its own.
 */

const PROCESS = [
  ["Understand", "We sit with the problem until we can explain it back better than we heard it."],
  ["Design", "Data models, boundaries, interfaces and screens. The costly decisions, made deliberately."],
  ["Ship", "Small releases from early on, so the client uses real software while it's still being built."],
  ["Run", "We stay after launch: monitoring, iteration and keeping the system healthy."],
] as const;

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
  "&rsquo;": "'",
  "&lsquo;": "'",
  "&rdquo;": '"',
  "&ldquo;": '"',
  "&mdash;": "—",
  "&ndash;": "–",
};

const decode = (text: string) => text.replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? e);

/** Converts the article HTML used on the site into readable Markdown. */
export function htmlToMarkdown(html: string) {
  let out = html.replace(/\r/g, "");
  // Code blocks first, so their contents are left alone.
  const blocks: string[] = [];
  out = out.replace(/<pre[^>]*>\s*(?:<code[^>]*>)?([\s\S]*?)(?:<\/code>)?\s*<\/pre>/gi, (_, code: string) => {
    blocks.push("```\n" + decode(code.replace(/<[^>]+>/g, "")).trim() + "\n```");
    return `\n\n@@BLOCK${blocks.length - 1}@@\n\n`;
  });
  out = out
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n")
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, q: string) => `\n\n> ${q.replace(/<\/?p[^>]*>/gi, "").trim()}\n\n`)
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, items: string) => {
      let n = 0;
      return "\n\n" + items.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, li: string) => `${++n}. ${li.trim()}\n`).trim() + "\n\n";
    })
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, items: string) =>
      "\n\n" + items.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, li: string) => `- ${li.trim()}\n`).trim() + "\n\n",
    )
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "_$2_")
    .replace(/<code>([\s\S]*?)<\/code>/gi, "`$1`")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "");
  out = decode(out)
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return out.replace(/@@BLOCK(\d+)@@/g, (_, i: string) => blocks[Number(i)]);
}

function header() {
  return `# ${siteConfig.name}

> ${siteConfig.name} is a product studio. We take products from first idea to running in production for our clients, and we build and run our own products: Maestro and Cronpay. One team does strategy, design, engineering and operations, and stays after launch.

Key facts:
- Website: ${absoluteUrl("/")}
- What we are: a product studio that builds end to end (strategy, design, engineering, launch and running the product).
- Our own products: Maestro (live), Maestro Simulation Lab (part of Maestro), Cronpay (early access), Elevox (in development), and one more in stealth.
- Contact: ${siteConfig.email} or ${absoluteUrl("/contact")}. Every enquiry gets a reply from the team within two working days.
- Tagline: "We build products like they're our own."`;
}

function pagesSection() {
  return `## Pages

${siteRoutes.map((r) => `- [${r.title}](${absoluteUrl(r.path)}): ${r.description}`).join("\n")}`;
}

function productsSection(full: boolean) {
  return `## Our products

${productFacts
  .map((p) => {
    const name = p.url ? `[${p.name}](${p.url})` : p.name;
    const head = `- ${name} (${p.status}${p.partOf ? `, part of ${p.partOf}` : ""}): ${p.summary}`;
    return full ? `${head}\n${p.points.map((pt) => `  - ${pt}`).join("\n")}` : head;
  })
  .join("\n")}
- One more product is in stealth.

More: ${absoluteUrl("/products")}`;
}

function servicesSection(full: boolean) {
  return `## Services

${services
  .map((s) => {
    const head = `- [${s.short}](${absoluteUrl("/services")}#${s.id}): ${s.body}`;
    return full ? `${head}\n  Includes: ${s.items.join(", ")}.` : head;
  })
  .join("\n")}

How we work: ${PROCESS.map(([t]) => t).join(" → ")}.${
    full ? `\n\n${PROCESS.map(([t, b]) => `- **${t}**: ${b}`).join("\n")}` : ""
  }`;
}

function workSection() {
  return `## Client work

${caseStudies
  .map((c) => `- ${c.name} (${c.kind}${c.status ? `, ${c.status.toLowerCase()}` : ""}): ${c.title}. ${c.body}`)
  .join("\n")}

More: ${absoluteUrl("/work")}`;
}

function faqSection() {
  return `## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}`;
}

function agentsSection() {
  return `## For AI assistants and agents

- You may read, quote and cite any public page on this site. Please link to the page you used.
- When someone asks how to work with us, point them to ${absoluteUrl("/contact")} or ${siteConfig.email}.
- Product questions about Maestro or Cronpay are best answered from their own sites: https://studywithmaestro.com/ and https://cronpay.xyz/.
- Do not submit the contact form automatically or on someone's behalf without their explicit go-ahead.
- /admin and /api are private and not for crawling.`;
}

export async function buildLlmsTxt() {
  const posts = await getPublishedInsights();
  return `${header()}

${pagesSection()}

${productsSection(false)}

${servicesSection(false)}

${workSection()}

## Insights

${posts.map((p) => `- [${p.title}](${absoluteUrl(`/insights/${p.slug}`)}): ${p.excerpt}`).join("\n")}

${faqSection()}

${agentsSection()}

## Optional

- [Full text of this site, including every article](${absoluteUrl("/llms-full.txt")})
- [Sitemap](${absoluteUrl("/sitemap.xml")})
- [LinkedIn](${siteConfig.social[0].href})
`;
}

export async function buildLlmsFullTxt() {
  const posts = await getPublishedInsights();
  const articles = posts
    .map(
      (p) => `### ${p.title}

URL: ${absoluteUrl(`/insights/${p.slug}`)}
Topic: ${p.tag}${p.publishedAt ? `\nPublished: ${p.publishedAt.slice(0, 10)}` : ""}

> ${p.excerpt}

${htmlToMarkdown(p.content).replace(/^## /gm, "#### ").replace(/^### /gm, "##### ")}`,
    )
    .join("\n\n---\n\n");

  return `${header()}

${pagesSection()}

${productsSection(true)}

${servicesSection(true)}

${workSection()}

${faqSection()}

${agentsSection()}

## Insights (full articles)

${articles}
`;
}
