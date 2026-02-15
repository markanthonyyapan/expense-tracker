import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { BudgetProvider } from "@/context/BudgetContext";

export const metadata: Metadata = {
  title: "ExpendiTrack",
  description: "Personal expense tracker app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ExpendiTrack",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F2BAC9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon-192.svg" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <BudgetProvider>
            <AuthProvider>{children}</AuthProvider>
          </BudgetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
