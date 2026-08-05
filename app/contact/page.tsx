import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { getCalendlyUrl } from "@/lib/data/settings";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Tell us what you're building. Levantate Labs replies within two working days.",
  path: "/contact",
});

export default async function ContactPage() {
  const calendlyUrl = await getCalendlyUrl();
  return <ContactClient calendlyUrl={calendlyUrl} />;
}
