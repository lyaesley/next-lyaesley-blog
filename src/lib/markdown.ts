import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogMetadata } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

// 구문 강조를 위한 Prism 초기화
let Prism: any = null;
if (typeof window === 'undefined') {
  try {
    Prism = require('prismjs');
    require('prismjs/components/prism-javascript');
    require('prismjs/components/prism-typescript');
    require('prismjs/components/prism-jsx');
    require('prismjs/components/prism-tsx');
    require('prismjs/components/prism-css');
    require('prismjs/components/prism-json');
    require('prismjs/components/prism-bash');
    require('prismjs/components/prism-python');
    require('prismjs/components/prism-java');
    require('prismjs/components/prism-go');
    require('prismjs/components/prism-rust');
  } catch (e) {
    console.warn('Prism not available for syntax highlighting');
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const metadata = data as BlogMetadata;
    const readingTime = calculateReadingTime(content);
    
    return {
      slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      content,
      date: metadata.date,
      author: metadata.author,
      tags: metadata.tags || [],
      category: metadata.category,
      readingTime,
      featured: metadata.featured || false,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown);
  
  let htmlContent = result.toString();
  
  // Prism을 사용할 수 있는 경우 구문 강조 추가
  if (Prism) {
    htmlContent = addSyntaxHighlighting(htmlContent);
  }
  
  return htmlContent;
}

function addSyntaxHighlighting(html: string): string {
  // 코드 블록을 찾아 구문 강조 적용
  return html.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (match, lang, code) => {
      try {
        const decodedCode = code
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"');
        
        const grammar = Prism.languages[lang];
        if (grammar) {
          const highlighted = Prism.highlight(decodedCode, grammar, lang);
          return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code><button class="copy-button" onclick="copyCode(this)">Copy</button></pre>`;
        }
      } catch (e) {
        console.warn(`Failed to highlight ${lang} code:`, e);
      }
      return match;
    }
  );
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter(post => post.featured);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return getAllPosts().slice(0, limit);
}