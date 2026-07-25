import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Tell us what you're building. Levantate Labs replies within two working days.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
