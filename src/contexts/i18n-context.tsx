'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 번역 데이터 타입 정의
type TranslationData = {
  [key: string]: string | TranslationData;
};

// 지원하는 언어 타입
export type Locale = 'ko' | 'en';

// i18n 컨텍스트 타입
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, namespace?: string) => string;
  isLoading: boolean;
}

// 컨텍스트 생성
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 번역 데이터 캐시
const translationCache: Record<Locale, TranslationData> = {
  ko: {},
  en: {}
};

// 중첩된 키에서 값 가져오기 (예: "navigation.home")
function getNestedValue(obj: TranslationData, path: string): string {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // 키를 찾을 수 없으면 원래 키 반환
    }
  }
  
  return typeof current === 'string' ? current : path;
}

// 번역 파일 로드
async function loadTranslations(locale: Locale): Promise<TranslationData> {
  if (translationCache[locale] && Object.keys(translationCache[locale]).length > 0) {
    return translationCache[locale];
  }

  try {
    const response = await fetch(`/messages/${locale}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${locale}`);
    }
    const data = await response.json();
    translationCache[locale] = data;
    return data;
  } catch (error) {
    console.error(`번역 파일을 로드할 수 없습니다: ${locale}`, error);
    return {};
  }
}

// i18n Provider 컴포넌트
interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function I18nProvider({ children, defaultLocale = 'ko' }: I18nProviderProps) {
  const [locale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 언어 설정 로드
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'ko' || savedLocale === 'en')) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  // 번역 데이터 로드
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await loadTranslations(locale);
      setTranslations(data);
      setIsLoading(false);
    }
    loadData();
  }, [locale]);

  // 언어 변경 함수
  const setLocale = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  // 번역 함수
  const t = (key: string, namespace?: string): string => {
    if (isLoading) return key;
    
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return getNestedValue(translations, fullKey);
  };

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
    isLoading
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// i18n Hook
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// 번역 Hook (네임스페이스 지원)
export function useTranslations(namespace?: string) {
  const { t } = useI18n();
  return (key: string) => t(key, namespace);
}

// 로케일 Hook
export function useLocale() {
  const { locale } = useI18n();
  return locale;
}