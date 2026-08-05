import type { MetadataRoute } from "next";
import {
  getInsightSitemapEntries,
  getPageSitemapEntries,
} from "@/lib/seo";

export async function generateSitemaps() {
  return [{ id: "pages" }, { id: "insights" }];
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;

  if (id === "insights") {
    return getInsightSitemapEntries();
  }

  return getPageSitemapEntries();
}
