import type { Metadata } from "next";

import AppProviders from "@/providers/AppProviders";

import "./globals.css";

export const metadata: Metadata = {
  title: "Task Management System",
  description: "Task Management System",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
