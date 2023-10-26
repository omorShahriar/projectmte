import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { josefin_sans } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MTE-KUET",
  description: "A networking hub for mechatrons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${josefin_sans.variable} font-sans `}>
        <Providers>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
