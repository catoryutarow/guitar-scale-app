'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ScalePracticePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BackgroundLogo />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* 言語切り替え */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* パンくずナビ */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">{t.home}</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/articles" className="text-blue-600 hover:text-blue-800">{t.articles}</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{t.practiceTitle}</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-4">
              {t.articleCategory.beginner}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.practiceTitle}
            </h1>
            <p className="text-gray-500 text-sm">2025-01-22</p>
          </header>

          {/* 記事本文 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mt-0 mb-4">{t.practiceIntro}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.practiceIntroDesc}
              </p>

              {/* ステップ1 */}
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.practiceStep1}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.practiceStep1Desc}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.practiceStep1List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-800 font-mono">
                  <strong>A Minor Pentatonic:</strong> A - C - D - E - G
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  1 - ♭3 - 4 - 5 - ♭7
                </p>
              </div>

              {/* ステップ2 */}
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.practiceStep2}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.practiceStep2Desc}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.practiceStep2List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* ステップ3 */}
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.practiceStep3}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.practiceStep3Desc}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.practiceStep3List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-800 font-mono">
                  <strong>C Major:</strong> C - D - E - F - G - A - B
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  1 - 2 - 3 - 4 - 5 - 6 - 7
                </p>
              </div>

              {/* ステップ4 */}
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.practiceStep4}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.practiceStep4Desc}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.practiceStep4List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* コツ */}
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.practiceTips}</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <ul className="text-gray-700 space-y-2">
                  {t.practiceTipsList.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-500 mr-2">&#9733;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* まとめ */}
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.practiceSummary}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.practiceSummaryDesc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-xl p-8 text-center mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.practiceCta}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/?note=A&scale=マイナーペンタトニック"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                A {t.scaleMinorPentatonic}
              </Link>
              <Link
                href="/?note=C&scale=メジャー"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                C {t.scaleMajor}
              </Link>
            </div>
          </div>

          {/* 関連記事 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.articleRelated}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/articles/pentatonic-basics" className="text-blue-600 hover:text-blue-800">
                  → {t.pentatonicTitle}
                </Link>
              </li>
              <li>
                <Link href="/articles/mode-scales" className="text-blue-600 hover:text-blue-800">
                  → {t.modeTitle}
                </Link>
              </li>
              <li>
                <Link href="/articles/harmonic-minor" className="text-blue-600 hover:text-blue-800">
                  → {t.harmonicTitle}
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
