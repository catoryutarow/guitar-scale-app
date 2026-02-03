'use client';

import LocaleLink from '@/components/LocaleLink';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPageClient() {
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

        <article className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              {t.privacyTitle}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                {t.privacyIntro}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection1}</h2>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {t.privacySection1List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection2}</h2>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {t.privacySection2List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection3}</h2>
              <p className="mb-4">{t.privacySection3Desc}</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {t.privacySection3List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection4}</h2>
              <p className="mb-6">
                {t.privacySection4Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection5}</h2>
              <p className="mb-6">
                {t.privacySection5Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection6}</h2>
              <p className="mb-4">
                {t.privacySection6Desc1}
              </p>
              <p className="mb-4">
                {t.privacySection6Desc2}
              </p>
              <p className="mb-6">
                {t.privacySection6Desc3}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection7}</h2>
              <p className="mb-6">
                {t.privacySection7Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection8}</h2>
              <p className="mb-6">
                {t.privacySection8Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection9}</h2>
              <p className="mb-4">
                {t.privacySection9Desc1}
              </p>
              <p className="mb-6">
                {t.privacySection9Desc2}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection10}</h2>
              <p className="mb-6">
                {t.privacySection10Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection11}</h2>
              <p className="mb-6">
                {t.privacySection11Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.privacySection12}</h2>
              <p className="mb-6">
                {t.privacySection12Desc}{' '}
                <LocaleLink href="/contact" className="text-blue-600 hover:text-blue-800">
                  {t.contact}
                </LocaleLink>
              </p>

              <div className="border-t border-gray-200 mt-8 pt-6">
                <p className="text-gray-500 text-sm">
                  {t.privacyEnacted}<br />
                  {t.privacyUpdated}
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
