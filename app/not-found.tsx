import Link from 'next/link';
import { Kiwi_Maru } from "next/font/google";
import "./globals.css";

const kiwiMaru = Kiwi_Maru({
  weight: ['300', '400', '500'],
  subsets: ["latin"],
  variable: "--font-kiwi-maru",
  display: 'swap',
});

/**
 * グローバル404ページ
 * LanguageProviderの外で表示されるため、静的なコンテンツを使用
 */
export default function NotFound() {
  return (
    <html lang="ja">
      <body
        className={`${kiwiMaru.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-kiwi-maru)' }}
      >
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
          <main className="flex-grow container mx-auto px-4 py-8">
            {/* 404コンテンツ */}
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center">
                {/* 404アイコン */}
                <div className="mb-8">
                  <svg
                    className="w-32 h-32 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                {/* 404テキスト */}
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  ページが見つかりません / Page Not Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  お探しのページは存在しないか、移動した可能性があります。
                </p>

                {/* ホームへ戻るボタン */}
                <Link
                  href="/ja"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  ホームに戻る / Back to Home
                </Link>
              </div>
            </div>
          </main>

          {/* 簡易フッター */}
          <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="container mx-auto px-4 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} ギタースケールわかる君. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
