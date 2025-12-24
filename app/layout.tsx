import type { Metadata } from "next";
import { Kiwi_Maru } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const kiwiMaru = Kiwi_Maru({
  weight: ['300', '400', '500'],
  subsets: ["latin"],
  variable: "--font-kiwi-maru",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ギタースケールわかる君",
  description: "ギタースケールを視覚的に学べるアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${kiwiMaru.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-kiwi-maru)' }}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
