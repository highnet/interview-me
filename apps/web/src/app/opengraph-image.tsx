import { ImageResponse } from "next/og";

export const alt = "interview-me: Agents can't read your mind. So let it ask.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#2a3fc4", color: "#f7f8ff" }}>
        <div style={{ fontSize: 34, fontWeight: 600 }}>interview-me</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>
          <span>Agents can&rsquo;t read your mind.</span>
          <span style={{ color: "#f2e64a" }}>So let it ask.</span>
        </div>
        <div style={{ display: "flex", alignSelf: "flex-start", background: "#f2e64a", color: "#1b2033", fontSize: 30, padding: "16px 26px", borderRadius: 28 }}>
          Use the interview-me skill to understand what I mean.
        </div>
      </div>
    ),
    size,
  );
}
