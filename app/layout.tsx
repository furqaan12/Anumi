import type { Metadata } from "next";
import { Cabin, Nunito } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

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
      <body
        className={`${headingFont.variable} ${nunito.variable} ${vonique.variable} ${gtAmerica.variable} ${booton.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
