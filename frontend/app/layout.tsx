import type { Metadata } from "next";
import "./globals.css";
import { StacksProvider } from "@/context/StacksContext";

export const metadata: Metadata = {
  title: "S-pay | Premium Stacks Payments",
  description: "Experience the future of decentralized payments on Stacks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StacksProvider>
          {children}
        </StacksProvider>
      </body>
    </html>
  );
}
