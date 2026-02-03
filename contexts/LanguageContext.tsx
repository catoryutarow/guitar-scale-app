'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Language, Translations, getTranslation } from '@/lib/i18n';
import { locales, isValidLocale, type Locale } from '@/lib/locale-config';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: string;
}

export function LanguageProvider({ children, initialLocale = 'ja' }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 初期ロケールを検証
  const validInitialLocale: Language = isValidLocale(initialLocale) ? initialLocale : 'ja';

  const [language, setLanguageState] = useState<Language>(validInitialLocale);
  const [t, setT] = useState<Translations>(getTranslation(validInitialLocale));

  // 言語切り替え時にURLナビゲーション
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setT(getTranslation(lang));

    // 現在のパスからロケール部分を置換してナビゲート
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = segments[0];

    let newPath: string;
    if (currentLocale && isValidLocale(currentLocale)) {
      // 既存のロケールを新しいロケールに置換
      segments[0] = lang;
      newPath = '/' + segments.join('/');
    } else {
      // ロケールがない場合は先頭に追加
      newPath = `/${lang}${pathname}`;
    }

    router.push(newPath);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
