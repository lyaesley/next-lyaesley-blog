import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/markdown';
import { PostCard } from '@/components/blog/post-card';
import { ArrowLeft, Folder, BookOpen } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\w\S*/g, 
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
  
  const posts = getPostsByCategory(categoryName);
  
  if (posts.length === 0) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryName} - Tech Blog`,
    description: `Browse ${posts.length} articles in the ${categoryName} category. Discover insights and tutorials about ${categoryName.toLowerCase()}.`,
    keywords: [categoryName.toLowerCase(), 'articles', 'tutorials', 'tech blog'],
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\w\S*/g, 
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
  
  const posts = getPostsByCategory(categoryName);
  
  if (posts.length === 0) {
    notFound();
  }

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          href="/categories"
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Categories
        </Link>
      </div>

      {/* Category Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <Folder className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {categoryName}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{posts.length} article{posts.length !== 1 ? 's' : ''}</span>
          </div>
          {featuredPosts.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>{featuredPosts.length} featured</span>
            </div>
          )}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {featuredPosts.length > 0 ? 'More Articles' : 'All Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Related Categories */}
      <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Explore Other Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {getAllCategories()
            .filter(cat => cat !== categoryName)
            .slice(0, 6)
            .map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-all"
              >
                <Folder className="h-4 w-4 mr-2" />
                {category}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}