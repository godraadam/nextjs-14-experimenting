import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

export const metadata: Metadata = {
  title: "Stocks App",
  description: "Yet another stocks app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
