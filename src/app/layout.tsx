import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ankit-karmakar.tech";
const siteName = "Ankit Karmakar Portfolio";
const title = "Ankit Karmakar | Full Stack, App & IoT Developer Portfolio";
const description =
  "Portfolio of Ankit Karmakar, a full-stack app developer focused on React, Next.js, Node.js, React Native, AI integration, and IoT solutions.";
const keywords = [
  "Ankit Karmakar",
  "Ankit Karmakar portfolio",
  "Full stack developer portfolio",
  "MERN stack developer",
  "React developer",
  "Next.js developer",
  "React Native developer",
  "Node.js developer",
  "IoT developer",
  "AI integration developer",
  "Kolkata developer",
  "Portfolio website",
  "Software engineer portfolio",
];

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Ankit Karmakar",
  },
  description,
  applicationName: siteName,
  keywords,
  authors: [{ name: "Ankit Karmakar" }],
  creator: "Ankit Karmakar",
  publisher: "Ankit Karmakar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: "https://i.postimg.cc/y8J30VFX/Whats-App-Image-2026-03-19-at-21-21-50.jpg",
        width: 1200,
        height: 630,
        alt: "Ankit Karmakar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://i.postimg.cc/y8J30VFX/Whats-App-Image-2026-03-19-at-21-21-50.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ankit Karmakar",
    url: siteUrl,
    jobTitle: "Full-Stack App Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressCountry: "IN",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "React Native",
      "Node.js",
      "Express.js",
      "Firebase",
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "IoT",
      "AI Integration",
      "TypeScript",
    ],
    sameAs: [
      "https://github.com/davy-anii",
      "https://www.linkedin.com/in/ankit-karmakar-399760372/",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased bg-[#FFFDF5] text-black overflow-x-hidden selection:bg-[#FBFF48] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
