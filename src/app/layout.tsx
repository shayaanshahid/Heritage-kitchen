import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heritage Kitchen | Fusion South East Asian Restaurant",
  description: "Heritage Kitchen - Fusion South East Asian Restaurant located in Brussels, Belgium. Now open for Brunch, Lunch, and Dinner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-secondary text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
