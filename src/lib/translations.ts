// 번역 타입 정의
type NavigationKeys = 'home' | 'blog' | 'categories' | 'tags' | 'about' | 'contact' | 'search' | 'menuToggle';
type CommonKeys = 'readMore' | 'backTo' | 'featuredPosts' | 'recentPosts' | 'allPosts' | 'morePosts' | 'noResults' | 'loading' | 'error' | 'copy' | 'copied' | 'minRead' | 'featured' | 'by' | 'on' | 'in' | 'tagged' | 'articles' | 'article';

// 번역 키 타입
export type TranslationKey = 
  | `navigation.${NavigationKeys}`
  | `common.${CommonKeys}`
  | `homepage.${string}`
  | `blog.${string}`
  | `search.${string}`
  | `categories.${string}`
  | `tags.${string}`
  | `about.${string}`
  | `contact.${string}`
  | `footer.${string}`
  | `language.${string}`
  | `meta.${string}`;

// 한국어 전용 번역 상수
export const translations = {
  navigation: {
    home: "홈",
    blog: "블로그",
    categories: "카테고리",
    tags: "태그",
    about: "소개",
    contact: "문의",
    search: "검색",
    menuToggle: "메뉴 토글"
  },
  common: {
    readMore: "더 읽기",
    backTo: "돌아가기",
    featuredPosts: "추천 포스트",
    recentPosts: "최신 포스트",
    allPosts: "모든 포스트",
    morePosts: "더 많은 포스트",
    noResults: "결과 없음",
    loading: "로딩 중...",
    error: "오류",
    copy: "복사",
    copied: "복사됨!",
    minRead: "분 읽기",
    featured: "추천",
    by: "작성자",
    on: "작성일",
    in: "카테고리",
    tagged: "태그",
    articles: "게시글",
    article: "게시글"
  },
  homepage: {
    title: "테크 블로그",
    subtitle: "현대적인 웹 개발",
    welcome: "환영합니다",
    description: "현대적인 웹 개발, 프로그래밍 모범 사례, 그리고 새로운 기술에 대한 인사이트를 찾아보세요. 개발자와 기술 애호가들의 커뮤니티에 참여하세요.",
    exploreArticles: "게시글 둘러보기",
    learnMore: "더 알아보기",
    technicalArticles: "기술 게시글",
    growingCommunity: "성장하는 커뮤니티",
    openSourceKnowledge: "오픈소스 지식 공유",
    joinCommunity: "커뮤니티 참여",
    joinDescription: "개발 스킬을 향상시킬 준비가 되셨나요? 게시글을 둘러보고, 토론에 참여하고, 성장하는 개발자 커뮤니티의 일원이 되어보세요.",
    readArticles: "게시글 읽기",
    getInTouch: "연락하기",
    noPosts: "아직 게시글이 없습니다",
    noPostsDescription: "최신 기술 게시글과 튜토리얼을 위해 곧 다시 확인해주세요.",
    learnMoreAbout: "더 알아보기",
    communityLabel: "커뮤니티",
    knowledgeSharing: "지식 공유"
  },
  blog: {
    title: "블로그",
    description: "웹 개발, 프로그래밍, 기술에 관한 모든 기술 게시글과 튜토리얼을 둘러보세요.",
    browseAll: "모든 게시글 둘러보기",
    advancedSearch: "고급 검색",
    viewAllCategories: "모든 카테고리 보기",
    popularTags: "인기 태그",
    viewAllTags: "모든 태그 보기"
  },
  search: {
    title: "게시글 검색",
    description: "정확히 찾고 있는 것을 찾아보세요",
    placeholder: "게시글 검색...",
    category: "카테고리",
    allCategories: "모든 카테고리",
    tags: "태그",
    clearFilters: "필터 지우기",
    filtersActive: "필터 활성화됨",
    found: "개 게시글을 찾았습니다",
    noArticlesFound: "게시글을 찾을 수 없습니다",
    adjustSearch: "검색어나 필터를 조정해보세요",
    clearAllFilters: "모든 필터 지우기",
    startSearching: "검색 시작",
    enterSearchTerm: "검색어를 입력하거나 필터를 사용하여 게시글을 찾아보세요"
  },
  categories: {
    title: "카테고리",
    description: "주제별로 정리된 게시글을 둘러보세요. 정확히 찾고 있는 콘텐츠를 찾아보세요.",
    viewArticles: "게시글 보기",
    latest: "최신",
    noCategoriesYet: "아직 카테고리가 없습니다",
    noCategoriesDescription: "더 많은 콘텐츠를 게시하면서 카테고리가 여기에 나타날 예정입니다.",
    backToCategories: "카테고리로 돌아가기",
    featuredArticles: "추천 게시글",
    moreArticles: "더 많은 게시글",
    allArticles: "모든 게시글",
    exploreOtherCategories: "다른 카테고리 둘러보기"
  },
  tags: {
    title: "태그",
    description: "태그를 통해 게시글을 둘러보세요. 특정 기술, 개념, 주제와 관련된 콘텐츠를 찾아보세요.",
    popularTags: "인기 태그",
    allTags: "모든 태그",
    totalTags: "전체 태그",
    avgPostsPerTag: "태그당 평균 포스트",
    noTagsYet: "아직 태그가 없습니다",
    noTagsDescription: "분류된 주제로 더 많은 콘텐츠를 게시하면서 태그가 여기에 나타날 예정입니다.",
    backToTags: "태그로 돌아가기",
    relatedTags: "관련 태그",
    tagStatistics: "태그 통계"
  },
  about: {
    title: "테크 블로그 소개",
    description: "테크 블로그, 우리의 미션, 그리고 기술 콘텐츠 뒤에 있는 팀에 대해 더 알아보세요.",
    ourMission: "우리의 미션",
    missionDescription1: "테크 블로그에서는 지식이 자유롭고 접근 가능하게 공유되어야 한다고 믿습니다. 우리의 목표는 복잡한 기술 개념과 실제 구현 사이의 격차를 해소하여 모든 수준의 개발자가 기술을 향상시키고 최신 기술을 따라갈 수 있도록 돕는 것입니다.",
    missionDescription2: "우리는 프로젝트에서 즉시 적용할 수 있는 심층적인 튜토리얼, 모범 사례, 실제 예제를 제공하는 데 중점을 둡니다. 개발 여정을 시작하는 분이든 전문 지식을 확장하려는 숙련된 전문가든, 여기서 가치 있는 콘텐츠를 찾을 수 있습니다.",
    whatWeCover: "다루는 내용",
    webDevelopment: "웹 개발",
    webDevDescription: "현대적인 JavaScript, TypeScript, React, Next.js 및 최신 웹 기술",
    bestPractices: "모범 사례",
    bestPracticesDescription: "코드 품질, 테스팅, 성능 최적화, 소프트웨어 아키텍처",
    careerGrowth: "커리어 성장",
    careerGrowthDescription: "개발자 커리어 조언, 업계 인사이트, 전문적 개발",
    meetTheTeam: "팀 소개",
    teamDescription: "복잡한 기술 개념을 간단하게 만들고 개발자 커뮤니티가 성장할 수 있도록 돕는 데 전념하는 경험 많은 개발자, 아키텍트, 기술 애호가들의 집합체입니다.",
    joinOurCommunity: "커뮤니티 참여",
    joinDescription: "개발 스킬을 향상시킬 준비가 되셨나요? 게시글을 둘러보고, 토론에 참여하고, 성장하는 개발자 커뮤니티의 일원이 되어보세요.",
    readOurArticles: "게시글 읽기"
  },
  contact: {
    title: "문의하기",
    description: "테크 블로그 팀과 연락하세요. 여러분의 의견을 듣고 싶습니다!",
    contactInfo: "연락처 정보",
    email: "이메일",
    emailDescription: "일반적인 문의, 협업 기회, 또는 기술적 질문을 위해",
    socialMedia: "소셜 미디어",
    socialDescription: "업데이트를 받고 대화에 참여하세요",
    whatCanWeHelp: "어떤 도움을 드릴까요?",
    articleSuggestions: "게시글 제안 및 주제 요청",
    technicalQuestions: "기술적 질문 및 설명",
    collaborationOpportunities: "협업 기회",
    guestPostInquiries: "게스트 포스팅 문의",
    sendMessage: "메시지 보내기",
    name: "이름",
    namePlaceholder: "이름을 입력하세요",
    emailPlaceholder: "이메일을 입력하세요",
    subject: "제목",
    subjectPlaceholder: "무엇에 관한 문의인가요?",
    message: "메시지",
    messagePlaceholder: "도움이 필요한 내용에 대해 자세히 알려주세요...",
    sendMessageButton: "메시지 보내기",
    responseTime: "일반적으로 24-48시간 내에 응답드립니다. 긴급한 사안의 경우 이메일로 직접 연락해주세요."
  },
  footer: {
    description: "현대적인 웹 개발, 프로그래밍 모범 사례, 새로운 기술에 대한 인사이트를 공유합니다.",
    quickLinks: "바로가기",
    connect: "연결",
    privacyPolicy: "개인정보 처리방침",
    termsOfService: "이용약관",
    allRightsReserved: "모든 권리 보유.",
    builtWith: "❤️로 만들어진 Next.js 기반 GitHub Pages 배포",
    allPosts: "모든 포스트",
    categories: "카테고리",
    tags: "태그",
    search: "검색",
    categoriesTitle: "카테고리",
    webDevelopment: "웹 개발",
    javascript: "자바스크립트",
    react: "리액트",
    tutorials: "튜토리얼"
  },
  language: {
    korean: "한국어",
    english: "English",
    switchLanguage: "언어 변경"
  },
  meta: {
    defaultTitle: "테크 블로그 - 현대적인 웹 개발",
    defaultDescription: "현대적인 웹 개발, JavaScript, TypeScript, React 등을 다루는 기술 블로그입니다.",
    keywords: "웹 개발, 자바스크립트, 타입스크립트, 리액트, 넥스트JS, 프로그래밍"
  }
};

// 타입 안전한 번역 함수 - 중첩된 키 지원 (예: "navigation.home")
export function t(key: TranslationKey): string {
  const keys = key.split('.');
  let current: any = translations;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // 키를 찾을 수 없으면 원래 키 반환
    }
  }
  
  return typeof current === 'string' ? current : key;
}

// 네임스페이스별 번역 함수 (타입 안전)
export function createT(namespace: string) {
  return (key: string) => t(`${namespace}.${key}` as TranslationKey);
}