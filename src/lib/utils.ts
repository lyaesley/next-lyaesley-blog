// 날짜 포맷팅 유틸리티
export function formatDate(dateString: string, locale: string = 'ko-KR'): string {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// CSS 클래스 유틸리티 (clsx 대체)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// 컨테이너 스타일 상수
export const containerStyles = "container mx-auto px-4 sm:px-6 lg:px-8";

// 페이지 헤더 스타일 상수
export const pageHeaderStyles = "text-center mb-12";
export const pageTitleStyles = "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4";
export const pageDescriptionStyles = "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto";

// 읽기 시간 계산
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // 평균 읽기 속도
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}