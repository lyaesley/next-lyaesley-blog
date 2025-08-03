import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/markdown';
import { Tag, Hash } from 'lucide-react';
import { tagToSlug } from '@/lib/slugify';

export const metadata = {
  title: 'Tags - Tech Blog',
  description: 'Browse articles by tags. Discover content related to specific technologies, concepts, and topics.',
};

export default function TagsPage() {
  const tags = getAllTags();

  const getTagStats = (tag: string) => {
    const posts = getPostsByTag(tag);
    return {
      count: posts.length,
      featured: posts.filter(post => post.featured).length,
    };
  };

  // 포스트 수에 따라 태그 정렬 (내림차순)
  const sortedTags = tags
    .map(tag => ({
      name: tag,
      ...getTagStats(tag)
    }))
    .sort((a, b) => b.count - a.count);

  // 인기도별로 태그 그룹화
  const popularTags = sortedTags.filter(tag => tag.count >= 3);
  const regularTags = sortedTags.filter(tag => tag.count < 3);

  const TagCloud = ({ tags, title }: { tags: typeof sortedTags, title: string }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${tagToSlug(tag.name)}`}
            className="group inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-all"
          >
            <Hash className="h-3 w-3" />
            <span>{tag.name}</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-800 group-hover:text-blue-700 dark:group-hover:text-blue-300">
              {tag.count}
            </span>
            {tag.featured > 0 && (
              <span className="w-2 h-2 bg-yellow-400 rounded-full" title={`${tag.featured} featured posts`} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tags
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover content by exploring our tag collection. Each tag represents a specific technology, concept, or topic covered in our articles.
        </p>
      </div>

      {sortedTags.length > 0 ? (
        <>
          {popularTags.length > 0 && (
            <TagCloud tags={popularTags} title="Popular Tags" />
          )}
          
          {regularTags.length > 0 && (
            <TagCloud tags={regularTags} title="All Tags" />
          )}

          {/* Tag Statistics */}
          <div className="mt-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Tag Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {tags.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Tags
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {popularTags.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Popular Tags
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {Math.round(sortedTags.reduce((sum, tag) => sum + tag.count, 0) / tags.length)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Posts per Tag
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <Tag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No tags yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Tags will appear here as we publish more content with categorized topics.
          </p>
        </div>
      )}
    </div>
  );
}