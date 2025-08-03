import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/markdown';
import { PostCard } from '@/components/blog/post-card';
import { ArrowLeft, Hash, BookOpen } from 'lucide-react';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const tagName = tag.replace(/-/g, ' ').replace(/\w\S*/g, 
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
  
  const posts = getPostsByTag(tagName);
  
  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `#${tagName} - Tech Blog`,
    description: `Browse ${posts.length} articles tagged with ${tagName}. Discover content related to ${tagName.toLowerCase()}.`,
    keywords: [tagName.toLowerCase(), 'tag', 'articles', 'tutorials', 'tech blog'],
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const tagName = tag.replace(/-/g, ' ').replace(/\w\S*/g, 
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
  
  const posts = getPostsByTag(tagName);
  
  if (posts.length === 0) {
    notFound();
  }

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  // 관련 태그 가져오기 (같은 포스트에 나타나는 태그들)
  const relatedTags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (tag.toLowerCase() !== tagName.toLowerCase()) {
        relatedTags.add(tag);
      }
    });
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          href="/tags"
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Tags
        </Link>
      </div>

      {/* Tag Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <Hash className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              #{tagName}
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

      {/* Related Tags */}
      {relatedTags.size > 0 && (
        <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Tags
          </h2>
          <div className="flex flex-wrap gap-3">
            {Array.from(relatedTags).slice(0, 10).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-all"
              >
                <Hash className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}