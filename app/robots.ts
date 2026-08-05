import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
