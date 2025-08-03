// 한글 카테고리/태그를 영문 슬러그로 변환하는 매핑
export const categorySlugMap: Record<string, string> = {
  "웹 개발": "web-development",
  "JavaScript": "javascript", 
  "React": "react",
  "AI": "ai",
  "프로그래밍": "programming",
  "튜토리얼": "tutorials",
  "모범 사례": "best-practices",
  "성능": "performance",
  "접근성": "accessibility"
};

export const tagSlugMap: Record<string, string> = {
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
  "프로그래밍": "programming",
  "Claude Code": "claude-code",
  "AI": "ai",
  "CC": "cc"
};

// 카테고리/태그를 슬러그로 변환
export function categoryToSlug(category: string): string {
  return categorySlugMap[category] || category.toLowerCase().replace(/\s+/g, '-');
}

export function tagToSlug(tag: string): string {
  return tagSlugMap[tag] || tag.toLowerCase().replace(/\s+/g, '-');
}

// 슬러그를 원본 카테고리/태그로 변환
export function slugToCategory(slug: string): string {
  const entry = Object.entries(categorySlugMap).find(([_, value]) => value === slug);
  return entry ? entry[0] : slug.replace(/-/g, ' ').replace(/\w\S*/g, 
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function slugToTag(slug: string): string {
  const entry = Object.entries(tagSlugMap).find(([_, value]) => value === slug);
  return entry ? entry[0] : slug.replace(/-/g, ' ').replace(/\w\S*/g, 
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

// 일반적인 문자열을 URL 친화적 슬러그로 변환
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-') // 공백과 언더스코어를 하이픈으로
    .replace(/[^\w\-가-힣]/g, '') // 특수문자 제거 (한글 유지)
    .replace(/\-\-+/g, '-') // 연속된 하이픈을 하나로
    .replace(/^-+/, '') // 시작 하이픈 제거
    .replace(/-+$/, ''); // 끝 하이픈 제거
}