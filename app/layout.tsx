import type { Metadata } from "next";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanta.daycraftstudio.com"),
  title: {
    default: "VANTA — Fine Timepieces | Concept Store",
    template: "%s | VANTA — Fine Timepieces",
  },
  description:
    "VANTA is a fictional luxury watch house — a concept e-commerce store designed and built by Daycraft Studio to demonstrate high-end online retail design.",
  openGraph: {
    title: "VANTA — Fine Timepieces",
    description:
      "A concept luxury watch store by Daycraft Studio. Fictional brand, real craft.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-vanta-950">
      <body
        className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable} grain font-sans`}
      >
        <CartProvider>
          <SmoothScroll>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
