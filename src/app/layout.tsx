import type { Metadata, Viewport } from "next";
import "@/styles/franky-tokens.css";

export const metadata: Metadata = {
  title: "Franky's Pasta — Frische Pasta, direkt vor deine Tür",
  description: "Halal-zertifizierte Pasta, Pizza und Desserts aus Aachen. Online bestellen.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Franky's Pasta",
  },
  icons: {
    icon: "/bilder/logo.jpg",
    apple: "/bilder/logo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#4a5e4a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="safe-bottom">{children}</body>
    </html>
  );
}
