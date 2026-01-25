'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail: string;
  color: string;
}

export default function ArticleCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const articles: Article[] = [
    {
      slug: 'scale-practice',
      title: t.practiceTitle,
      description: t.practiceDesc,
      date: '2025-01-22',
      category: t.articleCategory.beginner,
      thumbnail: '/thumbnails/scale-practice.svg',
      color: 'from-green-400 to-green-600',
    },
    {
      slug: 'harmonic-minor',
      title: t.harmonicTitle,
      description: t.harmonicDesc,
      date: '2025-01-20',
      category: t.articleCategory.intermediate,
      thumbnail: '/thumbnails/harmonic-minor.svg',
      color: 'from-purple-400 to-purple-600',
    },
    {
      slug: 'pentatonic-basics',
      title: t.pentatonicTitle,
      description: t.pentatonicDesc,
      date: '2025-01-15',
      category: t.articleCategory.beginner,
      thumbnail: '/thumbnails/pentatonic.svg',
      color: 'from-blue-400 to-blue-600',
    },
    {
      slug: 'mode-scales',
      title: t.modeTitle,
      description: t.modeDesc,
      date: '2025-01-10',
      category: t.articleCategory.intermediate,
      thumbnail: '/thumbnails/mode-scales.svg',
      color: 'from-orange-400 to-orange-600',
    },
    {
      slug: 'blues-scale',
      title: t.bluesTitle,
      description: t.bluesDesc,
      date: '2025-01-05',
      category: t.articleCategory.practice,
      thumbnail: '/thumbnails/blues-scale.svg',
      color: 'from-indigo-400 to-indigo-600',
    },
  ];

  // 自動再生
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, articles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // 5秒後に自動再生を再開
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // スワイプ対応
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <section className="mt-8 mb-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t.articles}</h2>
        <Link
          href="/articles"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          {t.articleReadMore}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="relative">
        {/* カルーセル本体 */}
        <div
          ref={carouselRef}
          className="overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="w-full flex-shrink-0"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-1">
                  {/* サムネイル 16:9 */}
                  <div className={`relative aspect-video bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <pattern id={`grid-${article.slug}`} width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill={`url(#grid-${article.slug})`} />
                      </svg>
                    </div>
                    {/* ギターフレットボードのイラスト */}
                    <div className="relative z-10 text-white">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        {/* フレットボード */}
                        <rect x="10" y="20" width="80" height="60" rx="4" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2"/>
                        {/* フレット */}
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line key={i} x1={10 + i * 20} y1="20" x2={10 + i * 20} y2="80" stroke="white" strokeWidth="1" opacity="0.6"/>
                        ))}
                        {/* 弦 */}
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <line key={i} x1="10" y1={20 + i * 12} x2="90" y2={20 + i * 12} stroke="white" strokeWidth="0.5" opacity="0.8"/>
                        ))}
                        {/* ノート */}
                        <circle cx="30" cy="32" r="6" fill="white"/>
                        <circle cx="50" cy="44" r="6" fill="white"/>
                        <circle cx="70" cy="56" r="6" fill="white"/>
                        <circle cx="50" cy="68" r="6" fill="white"/>
                      </svg>
                    </div>
                    {/* カテゴリバッジ */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                  {/* コンテンツ */}
                  <div className="p-5">
                    <p className="text-gray-400 text-xs mb-2">{article.date}</p>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 左右ナビゲーション（PC向け） */}
        <button
          onClick={goToPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors z-10"
          aria-label="Previous"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors z-10"
          aria-label="Next"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ドットインジケーター */}
        <div className="flex justify-center gap-2 mt-4">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
