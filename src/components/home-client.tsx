'use client';

import Link from 'next/link';
import { useTranslations } from '@/contexts/i18n-context';
import { PostCard } from '@/components/blog/post-card';
import { ArrowRight, TrendingUp, BookOpen, Users } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface HomeClientProps {
  featuredPosts: BlogPost[];
  recentPosts: BlogPost[];
}

export function HomeClient({ featuredPosts, recentPosts }: HomeClientProps) {
  const t = useTranslations('homepage');
  const tCommon = useTranslations('common');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 히어로 섹션 */}
      <section className="text-center py-16 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {t('welcome')}{' '}
          <span className="text-blue-600 dark:text-blue-400">{t('title')}</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {t('exploreArticles')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            {t('learnMore')}
          </Link>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg dark:bg-blue-900 mb-4">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {recentPosts.length}+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('technicalArticles')}
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg dark:bg-green-900 mb-4">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('growingCommunity')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('communityLabel')}
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg dark:bg-purple-900 mb-4">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('openSourceKnowledge')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('knowledgeSharing')}
            </p>
          </div>
        </div>
      </section>

      {/* 추천 포스트 */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tCommon('featuredPosts')}
            </h2>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              {tCommon('allPosts')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* 최신 포스트 */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {tCommon('recentPosts')}
          </h2>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            {tCommon('allPosts')} →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {t('noPosts')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('noPostsDescription')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              {t('learnMoreAbout')}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}