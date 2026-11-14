import type { Metadata, Viewport } from "next";
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
const mono = localFont({
  src: [{ path: "../fonts/DMMono-400.woff2", weight: "400" }, { path: "../fonts/DMMono-500.woff2", weight: "500" }],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: `${SITE.name}: the universe, one scale at a time`, template: `%s · ${SITE.name}` },
  description: SITE.heroText,
  metadataBase: new URL("https://usaaao-guide.vercel.app"),
  openGraph: { siteName: SITE.name, type: "website", title: `${SITE.name}: the universe, one scale at a time`, description: SITE.heroText },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#05070d", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
