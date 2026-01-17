'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">{t.appTitle}</h3>
            <p className="text-sm leading-relaxed">
              {t.footerDescription}
            </p>
          </div>

          {/* コンテンツリンク */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footerContents}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.aboutSite}
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  {t.articles}
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="hover:text-white transition-colors">
                  {t.audioAnalysis}
                </Link>
              </li>
            </ul>
          </div>

          {/* サポートリンク */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footerSupport}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/company" className="hover:text-white transition-colors">
                  {t.companyInfo}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {t.appTitle}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
