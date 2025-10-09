import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { StructuredData } from "@/components/structured-data";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
    variable: "--font-vt323",
    subsets: ["latin"],
    weight: "400"
});

export const metadata: Metadata = {
  title: "Augustin Viard - Développeur Web",
  description: "Découvrez le portfolio d'Augustin Viard, développeur web spécialisé React/Next.js. Projets, compétences et contact pour vos projets web.",
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
        description: "Découvrez le portfolio d'Augustin Viard, développeur web spécialisé React/Next.js. Projets, compétences et contact pour vos projets web.",
        url: "https://augustinviard.dev",
        siteName: "Augustin Viard - Développeur Web",
        images: [
            {
                url: "https://augustinviard.dev/og-image.png",
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
        description: "Découvrez le portfolio d'Augustin Viard, développeur web spécialisé React/Next.js. Projets, compétences et contact pour vos projets web.",
        images: ["https://augustinviard.dev/og-image.png"],
        creator: "@AugustinViard",
    },
        appleWebApp: {
        capable: true,
        title: "Augustin Viard",
        statusBarStyle: "black-translucent",
    },
    category: "Technology",
    classification: "Portfolio",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    keywords: [
        "Augustin Viard",
        "développeur web",
        "développeur full-stack",
        "React",
        "Next.js",
        "TypeScript",
        "portfolio",
        "développeur freelance"
    ],
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
        <head>
            <StructuredData />
        </head>
        <body className={`${vt323.variable} antialiased`}>
            <Providers>
                {children}
            </Providers>
        </body>
    </html>
  );
}
