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
  title: "Augustin Viard - Développeur Web",
  description: "Bienvenue sur le portfolio d'Augustin Viard, développeur web passionné. Découvrez mes projets, compétences et expériences dans le développement full-stack, ainsi que ma passion pour la création d'applications innovantes et performantes. Explorez mon univers numérique et contactez-moi pour collaborer sur vos futurs projets.",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
        other: [
            { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
            { rel: "icon", url: "/favicon.ico" },
        ],
    },
    openGraph: {
        title: "Augustin Viard - Développeur Web",
        description: "Bienvenue sur le portfolio d'Augustin Viard, développeur web passionné. Découvrez mes projets, compétences et expériences dans le développement full-stack, ainsi que ma passion pour la création d'applications innovantes et performantes. Explorez mon univers numérique et contactez-moi pour collaborer sur vos futurs projets.",
        url: "https://augustinviard.dev",
        siteName: "Augustin Viard - Développeur Web",
        images: [
            {
                url: "/og-image.png",
                width: 800,
                height: 800,
                alt: "Augustin Viard - Développeur Web",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Augustin Viard - Développeur Web",
        description: "Bienvenue sur le portfolio d'Augustin Viard, développeur web passionné. Découvrez mes projets, compétences et expériences dans le développement full-stack, ainsi que ma passion pour la création d'applications innovantes et performantes. Explorez mon univers numérique et contactez-moi pour collaborer sur vos futurs projets.",
        images: ["/og-image.png"],
        creator: "@AugustinViard",
    },
        appleWebApp: {
        capable: true,
        title: "Augustin Viard",
        statusBarStyle: "black-translucent",
    },
    category: "Technology",
    classification: "Portfolio",
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
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
