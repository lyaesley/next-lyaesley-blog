'use client';

import { Mail, Github, Twitter, Linkedin, MessageSquare, FileText, HelpCircle } from 'lucide-react';
import { useTranslations } from '@/contexts/i18n-context';

export function ContactClient() {
  const t = useTranslations('contact');

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('contactInfo')}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {t('email')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('emailDescription')}
                  </p>
                  <a
                    href="mailto:hello@techblog.com"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    hello@techblog.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center dark:bg-green-900">
                    <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {t('socialMedia')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {t('socialDescription')}
                  </p>
                  <div className="flex space-x-4">
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
                  </div>
                </div>
              </div>
            </div>

            {/* What to Contact Us About */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('whatCanWeHelp')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t('articleSuggestions')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t('technicalQuestions')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t('collaborationOpportunities')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t('guestPostInquiries')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('sendMessage')}
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={t('namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={t('subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={t('messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {t('sendMessageButton')}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {t('responseTime')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}