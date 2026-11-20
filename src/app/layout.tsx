import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coy — Discover",
  description: "Privacy-first mutual discovery experience",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-neutral-100 text-neutral-900`}>
        <main className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-white shadow-xl sm:border-x sm:border-neutral-200">
          {children}
        </main>
      </body>
    </html>
  );
}
