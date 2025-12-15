import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapModalProvider from "./providers/MapModalProvider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Calvary Fellowship Baptist Church | Painesville, Ohio",
  description:
    "Calvary Fellowship Baptist Church in Painesville, Ohio - Proclaiming the Good News of Jesus Christ with worship services, ministries, and community outreach.",
  keywords: [
    "church",
    "baptist",
    "Painesville",
    "Ohio",
    "worship",
    "Sunday service",
    "Jesus Christ",
    "Christian",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cfbchurch.net",
    title: "Calvary Fellowship Baptist Church",
    description:
      "Calvary Fellowship Baptist Church in Painesville, Ohio - Proclaiming the Good News of Jesus Christ.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <MapModalProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </MapModalProvider>
      </body>
    </html>
  );
}
