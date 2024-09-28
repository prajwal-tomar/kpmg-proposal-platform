import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from "@/components/header";
import ProtectedRoute from "@/components/protected-route";

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
        <ProtectedRoute>
          <Header />
          {children}
          <ToastContainer />
        </ProtectedRoute>
      </body>
    </html>
  );
}
