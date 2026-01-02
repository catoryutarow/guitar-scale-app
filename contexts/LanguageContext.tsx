'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, getTranslation } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ja');
  const [t, setT] = useState<Translations>(getTranslation('ja'));

  // 言語をlocalStorageに保存
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setT(getTranslation(lang));
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // 初回読み込み時にlocalStorageから言語を復元
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language | null;
      if (savedLang && ['ja', 'en', 'zh', 'es'].includes(savedLang)) {
        setLanguageState(savedLang);
        setT(getTranslation(savedLang));
      }
    }
  }, []);

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
