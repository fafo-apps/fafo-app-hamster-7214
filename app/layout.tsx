import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Travel Journal",
    template: "%s · Travel Journal",
  },
  description: "A clean, elegant travel blog to share your adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>        
        <header className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">Travel Journal</Link>
            <nav className="text-sm text-zinc-600 dark:text-zinc-400">
              <a href="/" className="hover:underline">Home</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Travel Journal
          </div>
        </footer>
      </body>
    </html>
  );
}
