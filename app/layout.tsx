import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "KPMG Proposal Platform",
  description: "Efficiently delegate and manage proposal tasks across KPMG's workforce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        {children}
      </body>
    </html>
  );
}
