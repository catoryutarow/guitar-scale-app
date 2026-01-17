'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BluesScalePage() {
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
          <span className="text-gray-600">{t.bluesTitle}</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
              {t.articleCategory.practice}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.bluesTitle}
            </h1>
            <p className="text-gray-500 text-sm">2025-01-05</p>
          </header>

          {/* 記事本文 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mt-0 mb-4">{t.bluesWhat}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.bluesWhatDesc1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.bluesWhatDesc2}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.bluesStructure}</h2>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-800 font-mono mb-2">
                  <strong>{t.bluesExample}:</strong> A - C - D - E♭ - E - G
                </p>
                <p className="text-gray-600 text-sm">
                  {t.bluesDegrees}: 1 - ♭3 - 4 - ♭5 - 5 - ♭7
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {t.bluesStructureDesc}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.bluesNote}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.bluesNoteMagic}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.bluesBending}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.bluesBendingDesc}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.bluesHammerPull}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.bluesHammerPullDesc}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.bluesSlide}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.bluesSlideDesc}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.bluesPatterns}</h2>

              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">{t.bluesPattern1}</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {t.bluesPattern1Desc}
                </p>
                <div className="bg-gray-200 rounded p-3 font-mono text-sm text-gray-800">
                  ♭7 → 5 → ♭5 → 4 → ♭3 → 1
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">{t.bluesPattern2}</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {t.bluesPattern2Desc}
                </p>
                <div className="bg-gray-200 rounded p-3 font-mono text-sm text-gray-800">
                  1 → ♭3 (bend) → 4 → ♭5 (quarter bend) → 5
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">{t.bluesPattern3}</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {t.bluesPattern3Desc}
                </p>
                <div className="bg-gray-200 rounded p-3 font-mono text-sm text-gray-800">
                  1 → ♭3 → 4 → ♭5 → 4 → ♭3 → 1
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.bluesMajorApplication}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.bluesMajorApplicationDesc1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.bluesMajorApplicationDesc2}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.bluesPractice}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.bluesPracticeList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.bluesGuitarists}</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">B.B. King</h4>
                  <p className="text-gray-600 text-sm">{t.bluesGuitarist1}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">Stevie Ray Vaughan</h4>
                  <p className="text-gray-600 text-sm">{t.bluesGuitarist2}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">Eric Clapton</h4>
                  <p className="text-gray-600 text-sm">{t.bluesGuitarist3}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">Gary Moore</h4>
                  <p className="text-gray-600 text-sm">{t.bluesGuitarist4}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.bluesSummary}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.bluesSummaryDesc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.bluesCta}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/?note=A&scale=ブルース"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                {t.bluesViewA}
              </Link>
              <Link
                href="/?note=E&scale=ブルース"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-colors duration-200"
              >
                {t.bluesViewE}
              </Link>
            </div>
          </div>

          {/* 関連記事 */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.articleRelated}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/articles/pentatonic-basics"
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{t.pentatonicTitle}</h4>
                <p className="text-gray-600 text-sm">{t.pentatonicDesc}</p>
              </Link>
              <Link
                href="/articles/mode-scales"
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{t.modeTitle}</h4>
                <p className="text-gray-600 text-sm">{t.modeDesc}</p>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
