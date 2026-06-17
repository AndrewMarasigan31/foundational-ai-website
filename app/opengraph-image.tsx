import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Foundational AI Systems — Local SEO for Small Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  let fontData: ArrayBuffer | undefined;
  try {
    fontData = await fetch(
      "https://fonts.gstatic.com/s/bricolagegrotesque/v10/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5DWVBiG2.woff2"
    ).then((res) => res.arrayBuffer());
  } catch {
    // fall back to system sans-serif if font fetch fails
  }

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
          padding: "72px 80px",
          fontFamily: "Bricolage Grotesque, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: 56,
            height: 4,
            background: "#C9A227",
            borderRadius: 2,
          }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#d1e5fb",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Foundational AI Systems
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#d1e5fb",
              opacity: 0.6,
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Local SEO that gets small businesses into the top 3.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#C9A227",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            foundationalaisystem.com
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#d1e5fb",
              opacity: 0.4,
            }}
          >
            GBP · Local SEO · AI Search · Lead Reactivation
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Bricolage Grotesque", data: fontData, style: "normal", weight: 700 }]
        : [],
    }
  );
}
