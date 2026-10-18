import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Funnel_Display } from "next/font/google";

import { Providers } from "@/components/providers";
import { siteUrl } from "@/lib/site";

import "./globals.css";

// Funnel Display: a grotesk with open, talkative counters. Headings only; Geist carries the body.
const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  weight: ["500", "600"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2a3fc4" },
    { media: "(prefers-color-scheme: dark)", color: "#243399" },
  ],
};

const title = "interview-me: your agent asks before it builds";
const description =
  "An agent skill that interviews you until it understands what you mean, then builds it. Works with Claude Code, Codex, Cursor, Copilot, Gemini CLI and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · interview-me" },
  description,
  keywords: ["agent skill", "Claude Code", "Codex", "Cursor", "GitHub Copilot", "Gemini CLI", "OpenCode", "requirements", "interview"],
  openGraph: { title, description, url: siteUrl, siteName: "interview-me", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${funnelDisplay.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
