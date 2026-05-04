import { ImageResponse } from "next/og";

export const alt = "EcomArtem — AI for 7-figure Shopify DTC brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "radial-gradient(ellipse 80% 60% at 30% 30%, rgba(132, 204, 22, 0.18), transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(132, 204, 22, 0.10), transparent 60%)," +
            "#0A0A0A",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.025em",
        }}
      >
        {/* Top bar — eyebrow + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            color: "#A1A1AA",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: "#84CC16",
                boxShadow: "0 0 16px rgba(132, 204, 22, 0.6)",
              }}
            />
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>EcomArtem</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#84CC16" }}>●</span>
            <span>Now booking Q3 2026</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Most agencies talk&nbsp;</span>
            <span style={{ color: "#84CC16" }}>AI</span>
            <span>.</span>
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>We&nbsp;</span>
            <span style={{ color: "#84CC16" }}>ship AI</span>
            <span>&nbsp;into your Shopify stack.</span>
          </div>

          <div
            style={{
              fontSize: 28,
              color: "#A1A1AA",
              maxWidth: 920,
              lineHeight: 1.4,
              marginTop: 16,
            }}
          >
            Done-for-you AI for 7-figure Shopify DTC brands. Marketing + ops + CX. Transparent pricing. Built by an operator since 2019.
          </div>
        </div>

        {/* Bottom bar — stats strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            color: "#71717A",
            borderTop: "1px solid #27272A",
            paddingTop: 28,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span>
            <span style={{ color: "#FFFFFF", fontWeight: 500 }}>500+</span>&nbsp;Shopify stores built
          </span>
          <span>
            <span style={{ color: "#FFFFFF", fontWeight: 500 }}>−50%</span>&nbsp;launch offer if KPIs missed
          </span>
          <span>
            <span style={{ color: "#FFFFFF", fontWeight: 500 }}>$1–10M</span>&nbsp;DTC focus
          </span>
          <span style={{ color: "#84CC16" }}>ecomartem.com →</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
