import { getAllPosts, getFeaturedPosts } from '@/lib/markdown';
import { HomeClient } from '@/components/home-client';

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getAllPosts().slice(0, 6);

  return <HomeClient featuredPosts={featuredPosts} recentPosts={recentPosts} />;
}
