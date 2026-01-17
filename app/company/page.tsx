'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CompanyPage() {
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
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← {t.backToHome}
          </Link>
        </nav>

        <article className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              {t.companyTitle}
            </h1>

            <div className="space-y-6">
              {/* 運営会社 */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {t.companySection1}
                </h2>
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <th className="py-3 text-left text-gray-600 font-medium w-1/3">{t.companyName}</th>
                      <td className="py-3 text-gray-800">株式会社モテコロ</td>
                    </tr>
                    <tr>
                      <th className="py-3 text-left text-gray-600 font-medium">{t.companyNameEn}</th>
                      <td className="py-3 text-gray-800">Motechoro Co., Ltd.</td>
                    </tr>
                    <tr>
                      <th className="py-3 text-left text-gray-600 font-medium">{t.companyOfficialSite}</th>
                      <td className="py-3">
                        <a
                          href="https://motechoro.jp/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          https://motechoro.jp/
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 事業内容 */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {t.companySection2}
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    {t.companyBusinessDesc}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {t.companyBusinessList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 本サービスについて */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {t.companySection3}
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    {t.companyServiceDesc1}
                  </p>
                  <p>
                    {t.companyServiceDesc2}
                  </p>
                </div>
              </section>

              {/* お問い合わせ */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {t.companySection4}
                </h2>
                <div className="text-gray-700">
                  <p className="mb-4">
                    {t.companyContactDesc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      {t.companyContactForm}
                    </Link>
                    <a
                      href="https://motechoro.jp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
                    >
                      {t.companyOfficialSiteBtn}
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
