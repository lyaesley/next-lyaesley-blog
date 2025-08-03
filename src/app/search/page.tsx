import { getAllPosts, getAllCategories, getAllTags } from '@/lib/markdown';
import { SearchClient } from '@/components/search-client';

export const metadata = {
  title: '게시글 검색 - 테크 블로그',
  description: '기술 게시글과 튜토리얼을 검색하세요. 정확히 찾고 있는 것을 찾아보세요.',
};

export default function SearchPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return <SearchClient posts={posts} categories={categories} tags={tags} />;
}