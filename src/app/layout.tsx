import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ankit Karmakar | Portfolio",
  description: "Modern developer portfolio for Ankit Karmakar. App & IoT Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} antialiased bg-[#FFFDF5] text-black overflow-x-hidden selection:bg-[#FBFF48] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
