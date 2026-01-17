'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
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

        <article className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {t.contactTitle}
            </h1>
            <p className="text-gray-600 mb-8">
              {t.contactDesc}
            </p>

            {/* FormBase iframe */}
            <div className="w-full">
              <iframe
                src="https://formbase.jp/motechoro/contact-form"
                width="100%"
                height="600"
                frameBorder="0"
                className="w-full min-h-[600px] border-0"
                title={t.contactTitle}
              />
            </div>

            {/* 補足情報 */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">{t.contactNotes}</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>・{t.contactNote1}</li>
                <li>・{t.contactNote2}</li>
                <li>・{t.contactNote3}</li>
              </ul>
            </div>

            {/* プライバシーポリシーリンク */}
            <div className="mt-6 text-center">
              <Link href="/privacy" className="text-sm text-blue-600 hover:text-blue-800 underline">
                {t.privacyPolicy}
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
