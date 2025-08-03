import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/markdown';
import { Folder, BookOpen } from 'lucide-react';
import { categoryToSlug } from '@/lib/slugify';

export const metadata = {
  title: 'Categories - Tech Blog',
  description: 'Browse articles by category. Find content organized by topics like Web Development, JavaScript, React, and more.',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  const getCategoryStats = (category: string) => {
    const posts = getPostsByCategory(category);
    return {
      count: posts.length,
      featured: posts.filter(post => post.featured).length,
      recent: posts[0]?.date || null
    };
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Categories
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore our articles organized by topic. Find exactly what you're looking for.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const stats = getCategoryStats(category);
            const formatDate = (dateString: string) => {
              return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
            };

            return (
              <Link
                key={category}
                href={`/categories/${categoryToSlug(category)}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all group-hover:border-blue-300 dark:group-hover:border-blue-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                        <Folder className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>
                        {stats.count} article{stats.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    {stats.featured > 0 && (
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        <span>{stats.featured} featured</span>
                      </div>
                    )}
                    
                    {stats.recent && (
                      <div className="text-xs">
                        Latest: {formatDate(stats.recent)}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium">
                      View articles →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Folder className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No categories yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Categories will appear here as we publish more content.
          </p>
        </div>
      )}
    </div>
  );
}