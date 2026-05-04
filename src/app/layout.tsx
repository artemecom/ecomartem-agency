import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EcomArtem — Done-for-you AI for 7-figure Shopify DTC brands",
  description:
    "Most agencies talk AI. We ship AI into your Shopify stack — to make your marketing spend actually pay back. Transparent pricing. Performance-tied retainer. Built by an operator since 2019.",
  metadataBase: new URL("https://ecomartem.com"),
  openGraph: {
    title: "EcomArtem — AI for 7-figure Shopify DTC brands",
    description: "Most agencies talk AI. We ship AI into your Shopify stack.",
    url: "https://ecomartem.com",
    siteName: "EcomArtem",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://ecomartem.com",
    languages: {
      en: "https://ecomartem.com",
      ru: "https://ecomartem.ru",
    },
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
      data-theme="dark"
      data-variant="A"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
