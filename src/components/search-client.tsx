'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from '@/contexts/i18n-context';
import { PostCard } from '@/components/blog/post-card';
import { Search, Filter, X } from 'lucide-react';
import Fuse from 'fuse.js';
import { BlogPost } from '@/types/blog';

interface SearchClientProps {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

export function SearchClient({ posts, categories, tags }: SearchClientProps) {
  const t = useTranslations('search');
  const tCommon = useTranslations('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'content', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
      ],
      threshold: 0.3,
      includeMatches: true,
    });
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let results = posts;

    // 텍스트 검색
    if (searchQuery.trim()) {
      const fuseResults = fuse.search(searchQuery);
      results = fuseResults.map(result => result.item);
    }

    // 카테고리 필터
    if (selectedCategory) {
      results = results.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 태그 필터
    if (selectedTags.length > 0) {
      results = results.filter(post =>
        selectedTags.some(tag =>
          post.tags.some(postTag =>
            postTag.toLowerCase() === tag.toLowerCase()
          )
        )
      );
    }

    return results;
  }, [posts, searchQuery, selectedCategory, selectedTags, fuse]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t('description')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t('placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('category')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">{t('allCategories')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
{t('clearFilters')}
              </button>
            </div>
          )}
        </div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('tags')}
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredPosts.length === 0 && hasActiveFilters
              ? tCommon('noResults')
              : `${filteredPosts.length} ${filteredPosts.length === 1 ? tCommon('article') : tCommon('articles')} ${t('found')}`}
          </h2>
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Filter className="h-4 w-4" />
<span>{t('filtersActive')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : hasActiveFilters ? (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {t('noArticlesFound')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('adjustSearch')}
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
{t('clearAllFilters')}
          </button>
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {t('startSearching')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('enterSearchTerm')}
          </p>
        </div>
      )}
    </div>
  );
}