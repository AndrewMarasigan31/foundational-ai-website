import { ImageResponse } from "next/og";

export const alt = "Turn the clicks you already get into booked calls | Foundational AI Systems";
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
              fontSize: 78,
              fontFamily: "Bricolage Grotesque",
              fontWeight: 800,
              color: "#d1e5fb",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Clicks In.
          </div>
          <div
            style={{
              fontSize: 78,
              fontFamily: "Bricolage Grotesque",
              fontWeight: 800,
              color: "#C9A227",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Calls Booked.
          </div>
          <div
            style={{
              fontSize: 27,
              color: "#99907b",
              marginTop: 22,
              lineHeight: 1.3,
            }}
          >
            We turn the traffic you already get into booked calls.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#C9A227", display: "flex" }}>
            Book a free audit call
          </div>
          <div style={{ fontSize: 16, color: "#99907b", display: "flex" }}>foundationalaisystem.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bricolage Grotesque", data: fontData, style: "normal", weight: 800 }],
    }
  );
}
