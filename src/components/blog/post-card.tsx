'use client';

import Link from 'next/link';
import { createT } from '@/lib/translations';
import { BlogPost } from '@/types/blog';
import { Calendar, Clock, Tag } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const t = createT('common');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className={`group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${featured ? 'lg:col-span-2' : ''}`}>
      {post.featured && (
        <div className="absolute -top-2 -right-2">
          <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
{t('featured')}
          </span>
        </div>
      )}
      
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} {t('minRead')}</span>
            </div>
          </div>

          <h2 className={`font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
            <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {post.category}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
{t('by')} {post.author}
            </p>
            {post.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <Tag className="h-3 w-3 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-gray-400">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}