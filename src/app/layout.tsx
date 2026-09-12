import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siss Hmue Aung | Software Engineer",
  description:
    "Software Engineer specializing in AI-powered applications, full-stack systems (Node.js, TypeScript, React), and mobile engineering (Flutter). Based in Bangkok, Thailand.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Flutter",
    "Node.js",
    "TypeScript",
    "React",
    "AI-Powered Apps",
    "Bangkok",
    "Siss Hmue Aung",
  ],
  authors: [{ name: "Siss Hmue Aung" }],
  icons: {
    icon: "https://sisshmue.github.io/dev.portfolio/icon.PNG",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0055ff] selection:text-white">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
