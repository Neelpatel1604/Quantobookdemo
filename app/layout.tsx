import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <header className="border-b py-4 bg-white">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-blue-600 flex items-center gap-2">
              <Image 
                src="/quanto-logo.webp" 
                alt="QuantoBooks Logo" 
                width={36} 
                height={36} 
                className="rounded-sm"
              />
              <span>Quanto</span>
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
