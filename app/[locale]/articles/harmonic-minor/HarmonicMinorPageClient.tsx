'use client';

import LocaleLink from '@/components/LocaleLink';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HarmonicMinorPageClient() {
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
          <LocaleLink href="/" className="text-blue-600 hover:text-blue-800">{t.home}</LocaleLink>
          <span className="mx-2 text-gray-400">/</span>
          <LocaleLink href="/articles" className="text-blue-600 hover:text-blue-800">{t.articles}</LocaleLink>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{t.scaleHarmonicMinor}</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
              {t.articleCategory.intermediate}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.harmonicTitle}
            </h1>
            <p className="text-gray-500 text-sm">2025-01-20</p>
          </header>

          {/* 記事本文 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mt-0 mb-4">{t.harmonicWhat}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.harmonicWhatDesc1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.harmonicWhatDesc2}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.harmonicStructure}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.harmonicStructureDesc}
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-800 font-mono">
                  <strong>A {t.scaleHarmonicMinor}:</strong> A - B - C - D - E - F - G# - A
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  1 - 2 - ♭3 - 4 - 5 - ♭6 - 7
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.harmonicCharacteristic}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.harmonicCharacteristicDesc}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.harmonicUsage}</h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.harmonicUsage1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.harmonicUsage1Desc}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.harmonicUsage2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.harmonicUsage2Desc}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.harmonicUsage3}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.harmonicUsage3Desc}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.harmonicComparison}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.harmonicComparisonDesc}
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="mb-3">
                  <p className="text-gray-800 font-mono">
                    <strong>A Natural Minor:</strong> A - B - C - D - E - F - G - A
                  </p>
                  <p className="text-gray-600 text-sm">1 - 2 - ♭3 - 4 - 5 - ♭6 - ♭7</p>
                </div>
                <div>
                  <p className="text-gray-800 font-mono">
                    <strong>A {t.scaleHarmonicMinor}:</strong> A - B - C - D - E - F - G# - A
                  </p>
                  <p className="text-gray-600 text-sm">1 - 2 - ♭3 - 4 - 5 - ♭6 - 7</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.harmonicPractice}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.harmonicPracticeList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.harmonicSummary}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.harmonicSummaryDesc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-xl p-8 text-center mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.harmonicCta}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <LocaleLink
                href="/?note=A&scale=ハーモニックマイナー"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                {t.harmonicViewA}
              </LocaleLink>
              <LocaleLink
                href="/?note=E&scale=ハーモニックマイナー"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                {t.harmonicViewE}
              </LocaleLink>
            </div>
          </div>

          {/* 関連記事 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.articleRelated}</h3>
            <ul className="space-y-3">
              <li>
                <LocaleLink href="/articles/mode-scales" className="text-blue-600 hover:text-blue-800">
                  → {t.modeTitle}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/articles/blues-scale" className="text-blue-600 hover:text-blue-800">
                  → {t.bluesTitle}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/articles/scale-practice" className="text-blue-600 hover:text-blue-800">
                  → {t.practiceTitle}
                </LocaleLink>
              </li>
            </ul>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
