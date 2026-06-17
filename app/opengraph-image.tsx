import { ImageResponse } from "next/og";

export const alt = "AI-Powered Local Growth for Small Businesses | Foundational AI Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // webpackIgnore prevents webpack from bundling fs/path — uses Node.js native modules at runtime
  const { readFileSync } = await import(/* webpackIgnore: true */ "fs");
  const { join } = await import(/* webpackIgnore: true */ "path");

  const logoData = readFileSync(join(process.cwd(), "public/logo.png"));
  const fontData = readFileSync(join(process.cwd(), "public/fonts/BricolageGrotesque-800.ttf"));
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
        }}
      >
        {/* Logo + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={logoSrc} width={44} height={44} />
          <span style={{ fontSize: 20, fontWeight: 600, color: "#d1e5fb" }}>
            Foundational AI Systems
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              fontSize: 68,
              fontFamily: "Bricolage Grotesque",
              fontWeight: 800,
              color: "#d1e5fb",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            AI-Powered
          </div>
          <div
            style={{
              fontSize: 68,
              fontFamily: "Bricolage Grotesque",
              fontWeight: 800,
              color: "#C9A227",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Local Growth
          </div>
          <div
            style={{
              fontSize: 68,
              fontFamily: "Bricolage Grotesque",
              fontWeight: 800,
              color: "#d1e5fb",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            for Small Businesses.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {["Local SEO", "GBP Optimization", "AI Growth Planning", "Lead Reactivation"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 14,
                  color: "#C9A227",
                  border: "1px solid rgba(201,162,39,0.4)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 16, color: "#99907b" }}>foundationalaisystem.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bricolage Grotesque", data: fontData, style: "normal", weight: 800 }],
    }
  );
}
