import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/labels";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mehndiwalaa.com"),
  title: {
    default: "Mehndi Wala — Verified Bridal & Guest Mehndi Artists",
    template: "%s | Mehndi Wala",
  },
  description:
    "Direct-booking marketplace for verified mehndi artists across Delhi NCR. Upfront pricing, genuine trust score, verified portfolios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-parchment text-ink antialiased min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
