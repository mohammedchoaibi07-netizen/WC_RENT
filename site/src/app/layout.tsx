import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { StickyActionBar } from "@/components/StickyActionBar";
import { Footer } from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WC Rent Belgium — Location de sanitaires mobiles",
  description:
    "Location de toilettes mobiles pour chantiers et événements partout en Belgique. Nettoyage, entretien et débouchage assurés par nos équipes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 pb-[88px] lg:pb-0">{children}</main>
        <Footer />
        <StickyActionBar />
      </body>
    </html>
  );
}
