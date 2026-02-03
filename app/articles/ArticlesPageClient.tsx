'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import BackgroundLogo from '@/components/BackgroundLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ArticlesPageClient() {
  const { t } = useLanguage();

  const articles = [
    {
      slug: 'scale-practice',
      title: t.practiceTitle,
      description: t.practiceDesc,
      date: '2025-01-22',
      category: t.articleCategory.beginner,
    },
    {
      slug: 'harmonic-minor',
      title: t.harmonicTitle,
      description: t.harmonicDesc,
      date: '2025-01-20',
      category: t.articleCategory.intermediate,
    },
    {
      slug: 'pentatonic-basics',
      title: t.pentatonicTitle,
      description: t.pentatonicDesc,
      date: '2025-01-15',
      category: t.articleCategory.beginner,
    },
    {
      slug: 'mode-scales',
      title: t.modeTitle,
      description: t.modeDesc,
      date: '2025-01-10',
      category: t.articleCategory.intermediate,
    },
    {
      slug: 'blues-scale',
      title: t.bluesTitle,
      description: t.bluesDesc,
      date: '2025-01-05',
      category: t.articleCategory.practice,
    },
  ];

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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            {t.articlesTitle}
          </h1>
          <p className="text-gray-600 text-center mb-12">{t.articlesSubtitle}</p>

          {/* 記事一覧 */}
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
              >
                <article className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <time className="text-gray-500 text-sm" dateTime={article.date}>
                      {article.date}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {article.description}
                  </p>
                  <div className="mt-4 text-blue-600 text-sm font-semibold">
                    {t.articleReadMore} →
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* 関連リンク */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t.articleTryScale}</h2>
            <p className="text-gray-600 mb-4">{t.articleTryScaleDesc}</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              {t.articleUseVisualizer}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
