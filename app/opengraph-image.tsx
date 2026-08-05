import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Software your company can stand on`;
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
          background: "linear-gradient(145deg, #16150F 0%, #1C1A14 48%, #2A1812 100%)",
          color: "#F7F5F0",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 28,
            letterSpacing: "-0.02em",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              background: "#C74A26",
            }}
          />
          Levantate Labs
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 700,
              fontFamily: "Arial, Helvetica, sans-serif",
              maxWidth: 980,
            }}
          >
            Software your company can stand on.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(247,245,240,0.62)",
              fontFamily: "Arial, Helvetica, sans-serif",
              maxWidth: 760,
            }}
          >
            Web platforms, AI systems and enterprise software — built end to end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(247,245,240,0.45)",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <span>levantate.in</span>
          <span style={{ color: "#C74A26" }}>Engineered to last.</span>
        </div>
      </div>
    ),
    size,
  );
}
