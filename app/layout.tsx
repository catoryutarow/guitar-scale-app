import type { Metadata } from "next";
import { Kiwi_Maru } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8PHC5QFD29"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8PHC5QFD29');
          `}
        </Script>
      </head>
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
