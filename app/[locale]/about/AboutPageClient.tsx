'use client';

import LocaleLink from '@/components/LocaleLink';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPageClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BackgroundLogo />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* 言語切り替え */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* ナビゲーション */}
        <nav className="mb-8">
          <LocaleLink href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← {t.backToHome}
          </LocaleLink>
        </nav>

        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            {t.aboutTitle}
          </h1>

          {/* イントロダクション */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.aboutServiceOverview}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.aboutServiceDesc1}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t.aboutServiceDesc2}
            </p>
          </section>

          {/* 主な機能 */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.aboutMainFeatures}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl mb-3">🎸</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aboutFeatureVisualize}</h3>
                <p className="text-gray-600 text-sm">
                  {t.aboutFeatureVisualizeDesc}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl mb-3">🎵</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aboutFeatureAnalysis}</h3>
                <p className="text-gray-600 text-sm">
                  {t.aboutFeatureAnalysisDesc}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl mb-3">🎹</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aboutFeaturePlay}</h3>
                <p className="text-gray-600 text-sm">
                  {t.aboutFeaturePlayDesc}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl mb-3">🎥</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aboutFeatureVideo}</h3>
                <p className="text-gray-600 text-sm">
                  {t.aboutFeatureVideoDesc}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aboutFeatureTuning}</h3>
                <p className="text-gray-600 text-sm">
                  {t.aboutFeatureTuningDesc}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aboutFeatureResponsive}</h3>
                <p className="text-gray-600 text-sm">
                  {t.aboutFeatureResponsiveDesc}
                </p>
              </div>
            </div>
          </section>

          {/* 対応スケール一覧 */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.aboutSupportedScales}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t.aboutBasicScales}</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>・{t.scaleMajor}</li>
                  <li>・{t.scaleNaturalMinor}</li>
                  <li>・{t.scaleHarmonicMinor}</li>
                  <li>・{t.scaleMelodicMinor}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t.aboutModeScales}</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>・{t.scaleDorian}</li>
                  <li>・{t.scalePhrygian}</li>
                  <li>・{t.scaleLydian}</li>
                  <li>・{t.scaleMixolydian}</li>
                  <li>・{t.scaleLocrian}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t.aboutPentaOther}</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>・{t.scaleMajorPentatonic}</li>
                  <li>・{t.scaleMinorPentatonic}</li>
                  <li>・{t.scaleBlues}</li>
                  <li>・{t.scaleInSen}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 使い方 */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.aboutHowToUse}</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{t.aboutStep1}</h3>
                  <p className="text-gray-600 text-sm">{t.aboutStep1Desc}</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{t.aboutStep2}</h3>
                  <p className="text-gray-600 text-sm">{t.aboutStep2Desc}</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{t.aboutStep3}</h3>
                  <p className="text-gray-600 text-sm">{t.aboutStep3Desc}</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{t.aboutStep4}</h3>
                  <p className="text-gray-600 text-sm">{t.aboutStep4Desc}</p>
                </div>
              </li>
            </ol>
          </section>

          {/* こんな方におすすめ */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.aboutRecommendedFor}</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                {t.aboutRecommend1}
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                {t.aboutRecommend2}
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                {t.aboutRecommend3}
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                {t.aboutRecommend4}
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                {t.aboutRecommend5}
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                {t.aboutRecommend6}
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="text-center">
            <LocaleLink
              href="/"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-lg"
            >
              {t.aboutCta} →
            </LocaleLink>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
