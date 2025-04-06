import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantoBooks | AI-Powered Bookkeeping",
  description: "Dashboard and Chat Interface for QuantoBooks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="border-b py-4 bg-white">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              QuantoBooks
            </Link>
            <nav className="flex gap-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-gray-900">
                AI Chat
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
        <footer className="py-4 border-t text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} QuantoBooks. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
