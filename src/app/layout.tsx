import type { Metadata } from "next";
import {Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "adverts-cmd",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}