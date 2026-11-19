import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { ContactFaq, ContactNextSteps } from "@/components/contact/ContactSections";
import { getCalendlyUrl } from "@/lib/data/settings";
import { createPageMetadata } from "@/lib/seo";

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
      <ContactClient calendlyUrl={calendlyUrl} />
      <ContactNextSteps />
      <ContactFaq />
    </>
  );
}
