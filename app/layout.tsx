import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Dra. Flaviana Becker Dartora - Psiquiatra para crianças, adolescentes e adultos",
  description:
    "Médica especializada em Psiquiatria e Psiquiatria da Infância e Adolescência, com atendimento para crianças, adolescentes e adultos. Especialista em Transtorno do Espectro Autista.",
  keywords: [
    "Psiquiatria",
    "Psiquiatra",
    "Crianças",
    "Adolescentes",
    "Adultos",
    "TEA",
    "Transtorno do Espectro Autista",
    "Santos",
    "SP",
  ],
  authors: [{ name: "Dra. Flaviana Becker Dartora" }],
  creator: "Dra. Flaviana Becker Dartora",
  publisher: "Dra. Flaviana Becker Dartora",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Dra. Flaviana Becker Dartora - Psiquiatra",
    description:
      "Psiquiatra para crianças, adolescentes e adultos. Especialista em Transtorno do Espectro Autista.",
    siteName: "Dra. Flaviana Becker Dartora",
    images: [
      {
        url: "/profile-image-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Dra. Flaviana Becker Dartora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Flaviana Becker Dartora - Psiquiatra",
    description:
      "Psiquiatra para crianças, adolescentes e adultos. Especialista em Transtorno do Espectro Autista.",
    images: ["/profile-image-2.jpeg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#6b2b2c",
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "verification_token", // Placeholder - replace with actual verification token if available
  },
  category: "Saúde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
