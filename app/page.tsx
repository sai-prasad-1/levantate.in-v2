import { ClientWork } from "@/components/home/ClientWork";
import { Hero } from "@/components/home/Hero";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { Principles } from "@/components/home/Principles";
import { Process } from "@/components/home/Process";
import { Products } from "@/components/home/Products";
import { Rise } from "@/components/home/Rise";
import { Services } from "@/components/home/Services";
import { Studio } from "@/components/home/Studio";
import { Ticker } from "@/components/home/Ticker";
import { CtaBand, Serif } from "@/components/site/ui";
import { siteConfig } from "@/lib/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Rise />
      <Ticker />
      <Studio />
      <Products />
      <Services />
      <Process />
      <ClientWork />
      <Principles />
      <InsightsPreview />
      <div id="contact">
        <CtaBand
          title={
            <>
              Tell us what <Serif>you&rsquo;re building.</Serif>
            </>
          }
          body="We reply within two working days. The person on the first call stays on the project until launch, and after."
        />
      </div>
    </>
  );
}
