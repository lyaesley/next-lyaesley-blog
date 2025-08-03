'use client';

import { useI18n, useTranslations } from '@/contexts/i18n-context';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  const t = useTranslations('language');
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: 'ko' | 'en') => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        aria-label={t('switchLanguage')}
      >
        <Globe className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 드롭다운 메뉴 */}
          <div className="absolute right-0 top-full mt-2 z-20 w-32 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="py-1">
              <button
                onClick={() => switchLanguage('ko')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  locale === 'ko'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
{t('korean')}
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  locale === 'en'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
{t('english')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}