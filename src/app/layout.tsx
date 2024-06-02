import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import LayoutMC from "@/components/shared/LayoutMC";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ai Project",
  description: "By Arman Mokhtari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <LayoutMC>
        
          {children}
          </LayoutMC>
      </body>
    </html>
  );
}
