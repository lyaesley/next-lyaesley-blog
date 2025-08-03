'use client';

import { PostCard } from '@/components/blog/post-card';
import { Filter, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/contexts/i18n-context';
import { BlogPost } from '@/types/blog';

interface BlogClientProps {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

export function BlogClient({ posts, categories, tags }: BlogClientProps) {
  const t = useTranslations('blog');
  const tHomepage = useTranslations('homepage');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('description')}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {tHomepage('noPosts')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {tHomepage('noPostsDescription')}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80">
          <div className="sticky top-24 space-y-8">
            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                게시글 검색
              </h2>
              <Link
                href="/search"
                className="w-full inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                {t('advancedSearch')}
              </Link>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  카테고리
                </h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/categories"
                  className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  {t('viewAllCategories')} →
                </Link>
              </div>
            )}

            {/* Popular Tags */}
            {tags.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('popularTags')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/tags"
                  className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  {t('viewAllTags')} →
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}