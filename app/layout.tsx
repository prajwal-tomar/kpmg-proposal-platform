import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "KPMG Proposal Platform",
  description: "Efficiently delegate and manage proposal tasks across KPMG's workforce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
