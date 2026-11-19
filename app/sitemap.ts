import type { MetadataRoute } from "next";
import { getInsightSitemapEntries, getPageSitemapEntries } from "@/lib/seo";

export const revalidate = 3600;

/** One sitemap at /sitemap.xml: the main pages, then every published insight. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...getPageSitemapEntries(), ...(await getInsightSitemapEntries())];
}
