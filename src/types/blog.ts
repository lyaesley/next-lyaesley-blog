export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured?: boolean;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  featured?: boolean;
}