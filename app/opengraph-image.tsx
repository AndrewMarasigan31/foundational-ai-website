import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Foundational AI Systems — Local SEO for Small Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#021524",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Gold aurora orb — top left */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -200,
            left: -150,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.07) 45%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <img src={logoSrc} width={48} height={48} style={{ borderRadius: 8 }} />
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#d1e5fb",
              letterSpacing: "-0.3px",
            }}
          >
            Foundational AI Systems
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: "#d1e5fb",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Local SEO that gets
            <br />
            <span style={{ color: "#C9A227" }}>small businesses</span> into
            <br />
            the top 3.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["GBP Audit", "Local SEO", "AI Search", "Lead Reactivation"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 14,
                  color: "#C9A227",
                  border: "1px solid rgba(201,162,39,0.35)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 16, color: "#d1e5fb", opacity: 0.35 }}>
            foundationalaisystem.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
