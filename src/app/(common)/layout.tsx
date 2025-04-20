import type { Metadata } from "next";
import { Inter, Vollkorn } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import styles from "./layout.module.css";

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
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className={styles.main}>
            {children}
        </main>
        <footer className={styles.footer}>
          <p>Copyright 2025</p>
          <small>If you loose hamster don't worry, he will be back</small>
        </footer>
      </body>
    </html>
  );
}
