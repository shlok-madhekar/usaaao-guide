import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
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
const serif = localFont({
  src: [
    { path: "../fonts/SourceSerif4-400.woff2", weight: "400" },
    { path: "../fonts/SourceSerif4-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/SourceSerif4-600.woff2", weight: "600" },
  ],
  variable: "--font-serif",
});
const mono = localFont({
  src: [{ path: "../fonts/DMMono-400.woff2", weight: "400" }],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: `${SITE.name}: free notes for USAAAO and the IOAA`, template: `%s · ${SITE.name}` },
  description: SITE.heroText,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
