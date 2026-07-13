import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuroX — July 2026 | NSBM Hackathon Hub",
  description:
    "NeuroX is a three-phase AI innovation hackathon organized by NSBM Hackathon Hub. Sri Lankan undergraduate teams of 3–4 compete in an online qualifier, remote build week, and grand finale at NSBM Green University. Register your team now.",
  keywords: [
    "NeuroX",
    "hackathon",
    "NSBM",
    "AI",
    "Sri Lanka",
    "undergraduate",
    "innovation",
    "NSBM Hackathon Hub",
  ],
  openGraph: {
    title: "NeuroX — July 2026 | NSBM Hackathon Hub",
    description:
      "Where neural networks meet real-world innovation. A three-phase AI hackathon for Sri Lankan undergraduates.",
    type: "website",
    siteName: "NeuroX",
    images: [
      {
        url: "https://neurox.hackathonhub.site/neurox.webp",
        width: 600,
        height: 180,
        alt: "NeuroX — AI Hackathon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroX — July 2026 | NSBM Hackathon Hub",
    description:
      "Where neural networks meet real-world innovation. Register your team now.",
    images: ["https://neurox.hackathonhub.site/neurox.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent-cyan focus:text-bg-primary focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
