import { getAllPosts, getAllCategories, getAllTags } from '@/lib/markdown';
import { BlogClient } from '@/components/blog-client';

export const metadata = {
  title: '블로그 - 테크 블로그',
  description: '웹 개발, 프로그래밍, 기술에 관한 모든 기술 게시글과 튜토리얼을 둘러보세요.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return <BlogClient posts={posts} categories={categories} tags={tags} />;
}