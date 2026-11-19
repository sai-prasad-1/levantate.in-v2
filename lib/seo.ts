import type { Metadata } from "next";
import { siteConfig, siteRoutes } from "@/lib/data/site";
import { getPublishedInsights } from "@/lib/data/insights-db";
import { productFacts } from "@/lib/data/products";
import { services } from "@/lib/data/services";

type PageSeoInput = {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function defaultOgImageUrl() {
  return absoluteUrl("/opengraph-image");
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [...siteConfig.keywords],
  noIndex = false,
  ogImage = defaultOgImageUrl(),
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const documentTitle = title
    ? `${siteConfig.name} · ${title}`
    : `${siteConfig.name} — We build products like they're our own`;

  return {
    title: {
      absolute: documentTitle,
    },
    description,
    keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
      types: {
        "text/plain": absoluteUrl("/llms.txt"),
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: documentTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: documentTitle,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (schema.org JSON-LD)                                 */
/* Entities are linked by @id, so search and answer engines see one     */
/* organisation that owns the website, the blog and the products.       */
/* ------------------------------------------------------------------ */

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;
const BLOG_ID = `${siteConfig.url}/insights#blog`;
const productId = (id: string) => `${siteConfig.url}/products#${id}`;

export function organizationJsonLd() {
  const sameAs = siteConfig.social
    .map((s) => s.href)
    .filter((href) => href.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: "Levantate",
    url: absoluteUrl("/"),
    email: siteConfig.email,
    slogan: "We build products like they're our own.",
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/apple-icon.png"),
      width: 180,
      height: 180,
    },
    image: absoluteUrl("/opengraph-image"),
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      "Product strategy and design",
      "Web and product engineering",
      "AI and machine learning",
      "AI agents and automation",
      "Retrieval-augmented generation",
      "Voice agents",
      "SaaS",
      "Enterprise software",
      "Multi-tenant platforms",
      "Blockchain and crypto payments",
    ],
    owns: productFacts.filter((p) => !p.partOf).map((p) => ({ "@id": productId(p.id) })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      url: absoluteUrl("/contact"),
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/** A page of the site, tied to the website and organisation entities. */
export function webPageJsonLd({
  type = "WebPage",
  name,
  description,
  path,
}: {
  type?: "WebPage" | "ContactPage" | "CollectionPage";
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} services`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${absoluteUrl("/services")}#${service.id}`,
        name: service.short,
        description: service.body,
        url: `${absoluteUrl("/services")}#${service.id}`,
        serviceType: service.short,
        areaServed: "Worldwide",
        provider: { "@id": ORG_ID },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.short,
          itemListElement: service.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item },
          })),
        },
      },
    })),
  };
}

export function productsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Products built and run by ${siteConfig.name}`,
    itemListElement: productFacts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": productId(product.id),
        name: product.name,
        description: product.summary,
        applicationCategory: product.category,
        operatingSystem: "Web",
        ...(product.url ? { url: product.url, sameAs: [product.url] } : {}),
        featureList: product.points.join(", "),
        creativeWorkStatus: product.status,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        ...(product.partOf
          ? { isPartOf: { "@id": productId(product.partOf.toLowerCase()) } }
          : {}),
      },
    })),
  };
}

export function faqJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function blogJsonLd(
  posts: ReadonlyArray<{ slug: string; title: string; excerpt: string; publishedAt: string | null }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_ID,
    name: `${siteConfig.name} Insights`,
    description:
      "Notes from the studio: engineering, AI and product lessons from building our own products and our clients'.",
    url: absoluteUrl("/insights"),
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/insights/${post.slug}`),
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      author: { "@id": ORG_ID },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  publishedAt,
  modifiedAt,
  tags = [],
  image,
  wordCount,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  modifiedAt?: string;
  tags?: string[];
  image?: string | null;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": BLOG_ID },
    mainEntityOfPage: absoluteUrl(path),
    image: image || absoluteUrl("/opengraph-image"),
    ...(tags[0] ? { articleSection: tags[0] } : {}),
    keywords: tags.join(", "),
    ...(wordCount ? { wordCount } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Sitemap                                                              */
/* ------------------------------------------------------------------ */

/** Last meaningful change to the static pages. Move it forward when page copy changes. */
const PAGES_UPDATED = new Date("2026-11-19");

export function getPageSitemapEntries() {
  return siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: PAGES_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

export async function getInsightSitemapEntries() {
  const posts = await getPublishedInsights();
  return posts.map((post) => ({
    url: absoluteUrl(`/insights/${post.slug}`),
    lastModified: post.publishedAt ? new Date(post.publishedAt) : PAGES_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));
}
