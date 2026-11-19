import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — We build products like they're our own`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0A0A0A",
          color: "#FFFFFF",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 26,
            letterSpacing: "0.02em",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "linear-gradient(121deg, #1A2BFF 0%, #3D55FF 50%, #8A97FF 100%)",
            }}
          />
          LEVANTATE LABS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            <span>We build products</span>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 400,
                textTransform: "none",
                letterSpacing: "-0.02em",
                color: "#8C9BFF",
              }}
            >
              like they&apos;re our own.
            </span>
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.4, color: "#9A9A9A", maxWidth: 820 }}>
            A product studio. Idea to production for our clients, and our own products: Maestro and Cronpay.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#9A9A9A",
          }}
        >
          <span>levantate.in</span>
          <span style={{ color: "#8C9BFF" }}>Get up. Ship something.</span>
        </div>
      </div>
    ),
    size,
  );
}
