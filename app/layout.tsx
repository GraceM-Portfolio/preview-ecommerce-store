"use client";

import { CartProvider, AuthProvider } from "@/contexts";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}