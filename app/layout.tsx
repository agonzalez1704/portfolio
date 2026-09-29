import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ChatProvider } from "@/components/chat";
import { profile } from "@/content/profile";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
  title: { default: `${profile.shortName}, ${profile.title}`, template: `%s · ${profile.shortName}` },
  description: profile.summary,
  openGraph: {
    type: "website",
    title: `${profile.shortName}, ${profile.title}`,
    description: profile.summary,
    images: [{ url: "/portrait.jpg", width: 1792, height: 2400, alt: profile.name }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-paper font-sans text-ink">
        <ChatProvider>{children}</ChatProvider>
        <Analytics />
      </body>
    </html>
  );
}
