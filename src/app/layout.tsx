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
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroX — July 2026 | NSBM Hackathon Hub",
    description:
      "Where neural networks meet real-world innovation. Register your team now.",
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
