'use client';

import LocaleLink from '@/components/LocaleLink';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsPageClient() {
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
            {t.backToHome}
          </LocaleLink>
        </nav>

        <article className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              {t.termsTitle}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                {t.termsIntro}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection1}</h2>
              <p className="mb-6">
                {t.termsSection1Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection2}</h2>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {t.termsSection2List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection3}</h2>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {t.termsSection3List.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection4}</h2>
              <p className="mb-6">
                {t.termsSection4Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection5}</h2>
              <p className="mb-6">
                {t.termsSection5Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection6}</h2>
              <p className="mb-6">
                {t.termsSection6Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection7}</h2>
              <p className="mb-6">
                {t.termsSection7Desc}
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">{t.termsSection8}</h2>
              <p className="mb-6">
                {t.termsSection8Desc}
              </p>

              <div className="border-t border-gray-200 mt-8 pt-6">
                <p className="text-gray-500 text-sm">
                  {t.termsEnacted}<br />
                  {t.termsUpdated}
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
