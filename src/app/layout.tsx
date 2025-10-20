import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { CurrencyProvider } from '@/hooks/use-currency';

export const metadata: Metadata = {
  title: 'Genesis Vault',
  description: 'Secure Neumorphic Crypto Wallet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen">
        <CurrencyProvider>
            {children}
        </CurrencyProvider>
        <Toaster />
      </body>
    </html>
  );
}
