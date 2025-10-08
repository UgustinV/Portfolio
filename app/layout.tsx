import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Augustin V.",
  description: "Bienvenue sur le portfolio d'Augustin Viard, développeur web et mobile passionné. Découvrez mes projets, compétences et expériences dans le développement full-stack, ainsi que ma passion pour la création d'applications innovantes et performantes. Explorez mon univers numérique et contactez-moi pour collaborer sur vos futurs projets.",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
