import type { Metadata } from "next";
import { Inter, Vollkorn } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const vollkorn = Vollkorn({
  variable: "--font-vollkorn",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamster homepage",
  description: "It's a favorite hamster's page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${vollkorn.variable}`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
