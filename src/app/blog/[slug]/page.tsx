import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug, markdownToHtml, getRecentPosts } from '@/lib/markdown';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { PostCard } from '@/components/blog/post-card';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - 코드어필(Code Appeal)`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== post.slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-6 flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="markdown-content">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        {/* Related Posts */}
        {recentPosts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              More Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}