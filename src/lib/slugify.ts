/**
 * 한글 카테고리/태그 URL 처리 유틸리티
 * 
 * 한글을 그대로 URL에 사용하며, 필요시 URL 인코딩/디코딩 처리
 * 새로운 한글 카테고리나 태그 추가 시 별도 작업 불필요
 */

// 카테고리를 URL 경로용으로 변환 (generateStaticParams용)
export function categoryToSlug(category: string): string {
  return encodeURIComponent(category);
}

// 태그를 URL 경로용으로 변환 (generateStaticParams용)
export function tagToSlug(tag: string): string {
  return encodeURIComponent(tag);
}

// URL 경로에서 카테고리명 복원
export function slugToCategory(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch (error) {
    console.warn('카테고리 디코딩 실패:', slug, error);
    return slug;
  }
}

// URL 경로에서 태그명 복원
export function slugToTag(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch (error) {
    console.warn('태그 디코딩 실패:', slug, error);
    return slug;
  }
}

/**
 * 사용법:
 * 
 * 1. 새 블로그 포스트 작성 시:
 *    ---
 *    category: "머신러닝"
 *    tags: ["딥러닝", "텐서플로우", "파이썬"]
 *    ---
 * 
 * 2. 추가 작업 불필요:
 *    - Next.js가 자동으로 /categories/머신러닝/ 경로 생성
 *    - URL 인코딩/디코딩 자동 처리
 *    - generateStaticParams에서 자동으로 정적 파일 생성
 * 
 * 3. 실제 URL:
 *    - 사용자가 보는 URL: /categories/머신러닝/
 *    - 브라우저 내부 처리: /categories/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D/
 */