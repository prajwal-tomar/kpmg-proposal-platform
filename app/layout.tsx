import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from './client-layout';

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
