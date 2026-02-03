'use client';

import LocaleLink from '@/components/LocaleLink';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ModeScalesPageClient() {
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
          <span className="text-gray-600">{t.modeDorian}</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
              {t.articleCategory.intermediate}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.modeTitle}
            </h1>
            <p className="text-gray-500 text-sm">2025-01-10</p>
          </header>

          {/* 記事本文 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mt-0 mb-4">{t.modeWhat}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.modeWhatDesc1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.modeWhatDesc2}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.mode7Modes}</h2>

              {/* イオニアン */}
              <div className="border-l-4 border-blue-500 pl-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.modeIonian}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t.modeIonianDesc}
                </p>
                <div className="bg-gray-100 rounded p-3 text-sm">
                  <span className="font-mono">1 - 2 - 3 - 4 - 5 - 6 - 7</span>
                </div>
              </div>

              {/* ドリアン */}
              <div className="border-l-4 border-green-500 pl-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.modeDorian}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t.modeDorianDesc}
                </p>
                <div className="bg-gray-100 rounded p-3 text-sm mb-2">
                  <span className="font-mono">1 - 2 - ♭3 - 4 - 5 - 6 - ♭7</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {t.modeDorianExample}
                </p>
              </div>

              {/* フリジアン */}
              <div className="border-l-4 border-red-500 pl-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.modePhrygian}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t.modePhrygianDesc}
                </p>
                <div className="bg-gray-100 rounded p-3 text-sm mb-2">
                  <span className="font-mono">1 - ♭2 - ♭3 - 4 - 5 - ♭6 - ♭7</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {t.modePhrygianExample}
                </p>
              </div>

              {/* リディアン */}
              <div className="border-l-4 border-yellow-500 pl-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.modeLydian}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t.modeLydianDesc}
                </p>
                <div className="bg-gray-100 rounded p-3 text-sm mb-2">
                  <span className="font-mono">1 - 2 - 3 - #4 - 5 - 6 - 7</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {t.modeLydianExample}
                </p>
              </div>

              {/* ミクソリディアン */}
              <div className="border-l-4 border-orange-500 pl-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.modeMixolydian}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t.modeMixolydianDesc}
                </p>
                <div className="bg-gray-100 rounded p-3 text-sm mb-2">
                  <span className="font-mono">1 - 2 - 3 - 4 - 5 - 6 - ♭7</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {t.modeMixolydianExample}
                </p>
              </div>

              {/* エオリアン */}
              <div className="border-l-4 border-purple-500 pl-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.modeAeolian}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t.modeAeolianDesc}
                </p>
                <div className="bg-gray-100 rounded p-3 text-sm">
                  <span className="font-mono">1 - 2 - ♭3 - 4 - 5 - ♭6 - ♭7</span>
                </div>
              </div>

              {/* ロクリアン */}
              <div className="border-l-4 border-gray-500 pl-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.modeLocrian}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t.modeLocrianDesc}
                </p>
                <div className="bg-gray-100 rounded p-3 text-sm">
                  <span className="font-mono">1 - ♭2 - ♭3 - 4 - ♭5 - ♭6 - ♭7</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.modeHowToRemember}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.modeHowToRememberDesc}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.modePracticalTips}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {t.modePracticalTipsList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{t.modeSummary}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.modeSummaryDesc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.modeCta}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <LocaleLink href="/?note=D&scale=ドリアン" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                D Dorian
              </LocaleLink>
              <LocaleLink href="/?note=E&scale=フリジアン" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                E Phrygian
              </LocaleLink>
              <LocaleLink href="/?note=F&scale=リディアン" className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                F Lydian
              </LocaleLink>
              <LocaleLink href="/?note=G&scale=ミクソリディアン" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                G Mixolydian
              </LocaleLink>
            </div>
          </div>

          {/* 関連記事 */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.articleRelated}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <LocaleLink
                href="/articles/pentatonic-basics"
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{t.pentatonicTitle}</h4>
                <p className="text-gray-600 text-sm">{t.pentatonicDesc}</p>
              </LocaleLink>
              <LocaleLink
                href="/articles/blues-scale"
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{t.bluesTitle}</h4>
                <p className="text-gray-600 text-sm">{t.bluesDesc}</p>
              </LocaleLink>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
