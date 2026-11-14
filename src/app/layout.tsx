import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import Sky from "@/components/Sky";
import { SITE } from "@/site";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "../fonts/DMSans-400.woff2", weight: "400" },
    { path: "../fonts/DMSans-500.woff2", weight: "500" },
    { path: "../fonts/DMSans-700.woff2", weight: "700" },
  ],
  variable: "--font-sans",
});
const mono = localFont({
  src: [
    { path: "../fonts/DMMono-400.woff2", weight: "400" },
    { path: "../fonts/DMMono-500.woff2", weight: "500" },
  ],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: `${SITE.name}: free astronomy olympiad prep`, template: `%s · ${SITE.name}` },
  description: SITE.heroText,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body style={{ fontFamily: "var(--font-sans)" }}>
        <Sky />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
