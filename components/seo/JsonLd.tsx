import {
  organizationJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export function JsonLd() {
  const payloads = [
    organizationJsonLd(),
    websiteJsonLd(),
    professionalServiceJsonLd(),
  ];

  return (
    <>
      {payloads.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
