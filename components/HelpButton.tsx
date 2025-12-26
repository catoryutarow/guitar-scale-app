'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HelpButton() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* フローティングヘルプボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="ヘルプ"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* モーダル */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="sticky top-0 bg-blue-600 text-white p-6 rounded-t-lg flex items-center justify-between">
              <h3 className="text-2xl font-bold flex items-center">
                <svg
                  className="w-7 h-7 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t.howToUse}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="閉じる"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* コンテンツ */}
            <div className="p-6">
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li className="leading-relaxed">{t.instruction1}</li>
                <li className="leading-relaxed">{t.instruction2}</li>
                <li className="leading-relaxed">{t.instruction3}</li>
                <li className="leading-relaxed">{t.instruction4}</li>
                <li className="leading-relaxed">{t.instruction5}</li>
                <li className="leading-relaxed">{t.instruction6}</li>
                <li className="leading-relaxed">{t.instruction7}</li>
              </ul>
            </div>

            {/* フッター */}
            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-lg border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {language === 'ja' ? '閉じる' : language === 'en' ? 'Close' : '关闭'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
