import type { Metadata } from "next";
import { Archivo, Archivo_Black, DM_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { ChapterNavigation } from "@/components/chapter-navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { PointerEffects } from "@/components/pointer-effects";
import { SITE } from "@/lib/portfolio-data";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo-black",
});

const archivo = Archivo({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.name }],
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

/* Runs before paint so the saved / system theme is applied with no flash.
   The class is added to <html> only on the client, so server markup is
   theme-neutral (html has suppressHydrationWarning for this one attribute). */
const themeScript = `(function(){var r=document.documentElement;try{var t=localStorage.getItem('yp-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}r.classList.add(t);r.style.colorScheme=t}catch(e){r.classList.add('dark');r.style.colorScheme='dark'}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${archivo.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#work">
          Skip to selected work
        </a>
        <SiteHeader />
        <ChapterNavigation />
        <ScrollProgress />
        <PointerEffects />
        {children}
      </body>
    </html>
  );
}
