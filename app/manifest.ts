import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#16150F",
    lang: "en",
    categories: ["business", "productivity"],
  };
}
