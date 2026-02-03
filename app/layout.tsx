/**
 * ルートレイアウト
 * 実際のレイアウトは [locale]/layout.tsx で処理される
 * このファイルはNext.js App Routerの要件として最小限のHTMLスケルトンを提供
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
