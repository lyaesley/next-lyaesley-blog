/**
 * 카테고리/태그 URL 슬러그 매핑 시스템
 * 
 * GitHub Pages 정적 호스팅을 위한 영문 슬러그 매핑
 * 새로운 한글 카테고리/태그 추가 시 매핑 테이블에 수동 추가 필요
 */

// 카테고리 매핑: 한글 → 영문 슬러그
const categorySlugMap: Record<string, string> = {
  "웹 개발": "web-development",
  "JavaScript": "javascript", 
  "React": "react",
  "AI": "ai",
  "프로그래밍": "programming",
  "튜토리얼": "tutorials",
  "모범 사례": "best-practices",
  "성능": "performance",
  "접근성": "accessibility",
  "머신러닝": "machine-learning",
  "데이터 사이언스": "data-science",
  "백엔드": "backend",
  "프론트엔드": "frontend",
  "DevOps": "devops",
  "보안": "security"
};

// 태그 매핑: 한글 → 영문 슬러그
const tagSlugMap: Record<string, string> = {
  "Next.js": "nextjs",
  "React": "react", 
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "웹 개발": "web-development",
  "성능": "performance",
  "최적화": "optimization",
  "모범 사례": "best-practices",
  "UX": "ux",
  "접근성": "accessibility",
  "ARIA": "aria",
  "HTML": "html",
  "CSS": "css",
  "프로그래밍": "programming",
  "Claude Code": "claude-code",
  "AI": "ai",
  "CC": "cc",
  "cc": "cc",
  "머신러닝": "machine-learning",
  "딥러닝": "deep-learning",
  "파이썬": "python",
  "텐서플로우": "tensorflow",
  "컴퓨터비전": "computer-vision",
  "자연어처리": "nlp",
  "데이터 분석": "data-analysis"
};

// 카테고리를 영문 슬러그로 변환
export function categoryToSlug(category: string): string {
  const slug = categorySlugMap[category];
  if (!slug) {
    console.warn(`카테고리 "${category}"에 대한 슬러그가 없습니다. categorySlugMap에 추가하세요.`);
    return category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  }
  return slug;
}

// 태그를 영문 슬러그로 변환
export function tagToSlug(tag: string): string {
  const slug = tagSlugMap[tag];
  if (!slug) {
    console.warn(`태그 "${tag}"에 대한 슬러그가 없습니다. tagSlugMap에 추가하세요.`);
    return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  }
  return slug;
}

// 영문 슬러그를 한글 카테고리명으로 변환
export function slugToCategory(slug: string): string {
  const entry = Object.entries(categorySlugMap).find(([_, value]) => value === slug);
  if (entry) {
    return entry[0];
  }
  
  // 매핑이 없으면 Title Case로 변환
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 영문 슬러그를 한글 태그명으로 변환
export function slugToTag(slug: string): string {
  const entry = Object.entries(tagSlugMap).find(([_, value]) => value === slug);
  if (entry) {
    return entry[0];
  }
  
  // 매핑이 없으면 Title Case로 변환
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * 사용법:
 * 
 * 1. 새 블로그 포스트 작성 시:
 *    ---
 *    category: "머신러닝"              # 한글로 작성
 *    tags: ["딥러닝", "파이썬"]         # 한글 태그 사용
 *    ---
 * 
 * 2. 새 카테고리/태그 추가 시:
 *    - 위의 categorySlugMap 또는 tagSlugMap에 매핑 추가
 *    - 예: "블록체인": "blockchain"
 * 
 * 3. 생성되는 URL:
 *    - /categories/machine-learning/   (SEO 친화적)
 *    - /tags/deep-learning/
 * 
 * 4. 표시되는 이름:
 *    - 페이지에서는 "머신러닝", "딥러닝" 등 한글로 표시
 */