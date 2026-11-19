import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/** Renders one or more schema.org objects as JSON-LD script tags. */
export function JsonLdScript({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

/** Site-wide entities: the organisation and the website. */
export function JsonLd() {
  return <JsonLdScript data={[organizationJsonLd(), websiteJsonLd()]} />;
}
