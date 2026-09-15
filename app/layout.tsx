import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = "https://yashpanchal.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Yash Panchal — Frontend Lead",
  description:
    "Frontend lead in Ahmedabad. Six years making React and Next.js products feel instant. An interactive record of the work.",
  openGraph: {
    title: "Yash Panchal — Frontend Lead",
    description:
      "Six years making React and Next.js products feel instant. An interactive record of the work.",
    url: SITE,
    siteName: "Yash Panchal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Panchal — Frontend Lead",
    description: "Six years making React and Next.js products feel instant.",
  },
};

export const viewport: Viewport = {
  themeColor: "#06090C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
