import type { Metadata } from "next";
import Script from "next/script";
import { Cabin, Noto_Sans, Noto_Sans_Kannada, Noto_Sans_Tamil, Nunito } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { RejectionHandler } from "./rejection-handler";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const headingFont = Cabin({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vonique = localFont({
  src: "../public/fonts/Vonique64.ttf",
  variable: "--font-vonique",
});

const gtAmerica = localFont({
  src: "../public/fonts/GT-America-Mono-Regular.ttf",
  variable: "--font-gt-america",
});

const booton = localFont({
  src: "../public/fonts/Booton-SemiBold.otf",
  variable: "--font-booton",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "devanagari", "arabic"],
  weight: ["400", "500", "600", "700"],
});

const notoSansKannada = Noto_Sans_Kannada({
  variable: "--font-noto-sans-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700"],
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-noto-sans-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Anumi | Where Modern India Slows Down",
  description: "Anumi is a space to pause, reset, catch your breath. For people on the go, or for anyone who needs a break. Live online breathwork and meditation sessions. Science-based tools for modern life.",
  openGraph: {
    title: "Anumi | Where Modern India Slows Down",
    description: "Anumi is a space to pause, reset, catch your breath. Live online breathwork and meditation sessions. Science-based tools for modern life.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anumi | Where Modern India Slows Down",
    description: "Anumi is a space to pause, reset, catch your breath. Live online breathwork and meditation sessions. Science-based tools for modern life.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preload critical background images so they're fetched immediately and don't cause a black flash */}
        <link rel="preload" href="/wow.jpg" as="image" />
        <link rel="preload" href="/sec1.jpg" as="image" />
        <link rel="preload" href="/wowblue.jpg" as="image" />
      </head>
      <Script
        id="suppress-fetch-rejection"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('unhandledrejection', function(e) {
              var r = e.reason;
              var msg = r && (r.message || String(r));
              if (msg === 'Failed to fetch' || (r && r.name === 'TypeError')) {
                e.preventDefault();
                e.stopPropagation();
              }
            }, true);
          `,
        }}
      />
      <body
        className={`${headingFont.variable} ${nunito.variable} ${vonique.variable} ${gtAmerica.variable} ${booton.variable} ${notoSans.variable} ${notoSansKannada.variable} ${notoSansTamil.variable} antialiased`}
        suppressHydrationWarning
      >
        <RejectionHandler>{children}</RejectionHandler>
      </body>
    </html>
  );
}
