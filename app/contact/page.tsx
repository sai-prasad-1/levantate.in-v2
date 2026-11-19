import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { ContactFaq, ContactNextSteps } from "@/components/contact/ContactSections";
import { getCalendlyUrl } from "@/lib/data/settings";
import { faqs } from "@/lib/data/faqs";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { createPageMetadata, faqJsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Tell us what you're building. Levantate Labs replies within two working days, and the person on the first call stays on the project until launch.",
  path: "/contact",
});

export default async function ContactPage() {
  const calendlyUrl = await getCalendlyUrl();
  return (
    <>
      <JsonLdScript data={[webPageJsonLd({ type: "ContactPage", name: "Contact Levantate Labs", description: "Tell us what you are building. We reply within two working days.", path: "/contact" }), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), faqJsonLd(faqs)]} />
      <ContactClient calendlyUrl={calendlyUrl} />
      <ContactNextSteps />
      <ContactFaq />
    </>
  );
}
