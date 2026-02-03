'use client';

import LocaleLink from '@/components/LocaleLink';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PentatonicBasicsPageClient() {
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
          <span className="text-gray-600">{t.pentatonicMajor}</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
              {t.articleCategory.beginner}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.pentatonicTitle}
            </h1>
            <p className="text-gray-500 text-sm">2025-01-15</p>
          </header>

          {/* 記事本文 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mt-0 mb-4">{t.pentatonicWhat}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.pentatonicWhatDesc1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.pentatonicWhatDesc2}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.pentatonicTypes}</h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.pentatonicMajor}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.pentatonicMajorDesc}
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-800 font-mono">
                  <strong>A {t.pentatonicMajor}:</strong> A - B - C# - E - F#
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  1 - 2 - 3 - 5 - 6
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.pentatonicMinor}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.pentatonicMinorDesc}
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-800 font-mono">
                  <strong>A {t.pentatonicMinor}:</strong> A - C - D - E - G
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  1 - ♭3 - 4 - 5 - ♭7
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.pentatonicWhy}</h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.pentatonicWhy1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.pentatonicWhy1Desc}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.pentatonicWhy2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.pentatonicWhy2Desc}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.pentatonicWhy3}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.pentatonicWhy3Desc}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.pentatonicPractice}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.pentatonicPracticeList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.pentatonicSummary}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.pentatonicSummaryDesc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.pentatonicCta}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocaleLink
                href="/?note=A&scale=メジャーペンタトニック"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                {t.pentatonicViewMajor}
              </LocaleLink>
              <LocaleLink
                href="/?note=A&scale=マイナーペンタトニック"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-colors duration-200"
              >
                {t.pentatonicViewMinor}
              </LocaleLink>
            </div>
          </div>

          {/* 関連記事 */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.articleRelated}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <LocaleLink
                href="/articles/blues-scale"
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{t.bluesTitle}</h4>
                <p className="text-gray-600 text-sm">{t.bluesDesc}</p>
              </LocaleLink>
              <LocaleLink
                href="/articles/mode-scales"
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{t.modeTitle}</h4>
                <p className="text-gray-600 text-sm">{t.modeDesc}</p>
              </LocaleLink>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
