'use client';

import { useRouter, usePathname } from 'next/navigation';
import AudioAnalyzer from '@/components/AudioAnalyzer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import LocaleLink from '@/components/LocaleLink';
import Footer from '@/components/Footer';
import { isValidLocale } from '@/lib/locale-config';

export default function AnalysisPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  // 現在のロケールを取得
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] && isValidLocale(segments[0]) ? segments[0] : 'ja';

  // 音源解析結果からのスケール切り替えハンドラー
  const handleScaleSelectFromAnalysis = (rootNote: string, scaleName: string) => {
    // メインページに遷移してスケールを選択状態にする
    router.push(`/${currentLocale}?note=${encodeURIComponent(rootNote)}&scale=${encodeURIComponent(scaleName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* 言語切り替え */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t.audioAnalysis}
          </h1>
          <p className="text-gray-600">{t.audioAnalysisSubtitle}</p>
        </div>

        {/* 戻るリンク */}
        <div className="max-w-4xl mx-auto mb-6">
          <LocaleLink
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t.backToScale}
          </LocaleLink>
        </div>

        {/* 音源解析セクション */}
        <AudioAnalyzer onScaleSelect={handleScaleSelectFromAnalysis} />

        {/* 説明 */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.audioHowToUse}</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>{t.audioInstruction1}</li>
            <li>{t.audioInstruction2}</li>
            <li>{t.audioInstruction3}</li>
            <li>{t.audioInstruction4}</li>
            <li>{t.audioInstruction5}</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
