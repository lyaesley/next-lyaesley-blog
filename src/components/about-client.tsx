'use client';

import { Github, Twitter, Linkedin, Mail, Code, Coffee, Users } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/contexts/i18n-context';

export function AboutClient() {
  const t = useTranslations('about');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('ourMission')}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                {t('missionDescription1')}
              </p>
              <p>
                {t('missionDescription2')}
              </p>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('whatWeCover')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg dark:bg-blue-900 mb-4">
                <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('webDevelopment')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('webDevDescription')}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg dark:bg-green-900 mb-4">
                <Coffee className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('bestPractices')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('bestPracticesDescription')}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg dark:bg-purple-900 mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('careerGrowth')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('careerGrowthDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('meetTheTeam')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600 dark:text-gray-300">TB</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  테크 블로그 팀
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('teamDescription')}
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a
                    href="https://github.com/yourusername"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:your.email@example.com"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('joinOurCommunity')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {t('joinDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {t('readOurArticles')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                문의하기
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}