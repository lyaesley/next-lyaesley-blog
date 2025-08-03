# 테크 블로그

Next.js 15로 구축되고 GitHub Pages에 배포된 현대적이고 고성능의 기술 블로그입니다. 저자와 독자 모두를 위한 포괄적인 기능과 함께 기술 콘텐츠에 최적화된 깔끔하고 전문적인 디자인이 특징입니다.

## ✨ 기능

- **🚀 Next.js 15** App Router와 정적 사이트 생성
- **📝 마크다운 지원** 코드 블록 구문 강조 기능
- **🏷️ 카테고리 & 태그** 콘텐츠 구성 기능
- **🔍 검색 기능** 퍼지 검색 기능
- **🌙 다크/라이트 테마** 시스템 선호도 지원
- **📱 반응형 디자인** 모든 디바이스에 최적화
- **⚡ 빠른 성능** 정적 사이트 생성
- **🔗 SEO 최적화** 적절한 메타 태그와 구조화된 데이터
- **📋 코드 복사 기능** 쉬운 코드 공유
- **🚀 GitHub Pages 배포** 자동화된 CI/CD

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15 with TypeScript
- **스타일링**: Tailwind CSS 4
- **콘텐츠**: Markdown with gray-matter
- **구문 강조**: Prism.js
- **검색**: Fuse.js
- **아이콘**: Lucide React
- **테마**: next-themes
- **배포**: GitHub Pages with GitHub Actions

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

1. **저장소 복제**
   ```bash
   git clone https://github.com/yourusername/tech-blog.git
   cd tech-blog
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 시작**
   ```bash
   npm run dev
   ```

4. **브라우저 열기**
   [http://localhost:3000](http://localhost:3000)을 방문하여 블로그를 확인하세요.

## 📝 콘텐츠 관리

### 블로그 포스트 추가하기

1. `posts/` 디렉토리에 새로운 `.md` 파일을 생성합니다
2. 필수 필드가 포함된 frontmatter를 추가합니다:

```markdown
---
title: "Your Amazing Blog Post"
excerpt: "A brief description of what this post covers"
date: "2024-01-15"
author: "Your Name"
tags: ["JavaScript", "React", "Web Development"]
category: "Web Development"
featured: false
---

Your markdown content goes here...

## Code Example

```javascript
function hello() {
  console.log("Hello, World!");
}
```
```

### 지원되는 Frontmatter 필드

- `title` (필수): 포스트 제목
- `excerpt` (필수): 미리보기용 간단한 설명
- `date` (필수): 발행일 (YYYY-MM-DD 형식)
- `author` (필수): 작성자 이름
- `tags` (필수): 태그 배열
- `category` (필수): 포스트 카테고리
- `featured` (선택): 추천 포스트로 표시할지 여부 (Boolean)

### 구문 강조

블로그는 다양한 언어의 구문 강조를 지원합니다:
- JavaScript/TypeScript
- JSX/TSX
- HTML/CSS
- JSON
- Bash/Shell
- Python
- Java
- Go
- Rust

## 🎨 커스터마이징

### 색상 및 스타일 변경

`src/app/globals.css`에서 CSS 변수를 편집합니다:

```css
:root {
  --primary: #0070f3;
  --background: #ffffff;
  --foreground: #171717;
  /* ... other variables */
}
```

### 레이아웃 수정

- **헤더**: `src/components/layout/header.tsx`
- **푸터**: `src/components/layout/footer.tsx`
- **메인 레이아웃**: `src/app/layout.tsx`

### 새 페이지 추가

1. `src/app/`에 새 디렉토리를 생성합니다
2. 컴포넌트가 포함된 `page.tsx` 파일을 추가합니다
3. SEO를 위한 메타데이터를 포함합니다

## 🚀 배포

### GitHub Pages (권장)

1. **이 저장소를 포크하거나 클론**

2. **GitHub Pages 활성화**
   - 저장소 Settings → Pages로 이동
   - 소스를 "GitHub Actions"로 설정

3. **설정 업데이트**
   - `src/app/layout.tsx`에서 저장소 URL 수정
   - 소셜 링크와 연락처 정보 업데이트

4. **main 브랜치에 푸시**
   - GitHub Action이 자동으로 빌드하고 배포합니다

### 수동 배포

```bash
# Build the static site
npm run build

# The built files will be in the 'out' directory
# Upload these files to your hosting provider
```

### 기타 호스팅 제공업체

이 블로그는 모든 정적 호스팅 서비스와 호환됩니다:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## 🛠️ 개발

### 사용 가능한 스크립트

```bash
npm run dev          # 개발 서버 시작
npm run build        # 프로덕션용 빌드
npm run start        # 프로덕션 서버 시작
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 확인
```

### 프로젝트 구조

```
tech-blog/
├── .github/workflows/    # GitHub Actions
├── posts/               # 블로그 포스트 (Markdown)
├── public/             # 정적 자산
├── src/
│   ├── app/           # Next.js App Router 페이지
│   ├── components/    # React 컴포넌트
│   ├── lib/          # 유틸리티 함수
│   └── types/        # TypeScript 정의
├── next.config.ts    # Next.js 설정
└── tailwind.config.ts # Tailwind 설정
```

## 📖 문서

자세한 문서와 고급 사용법은 [CLAUDE.md](./CLAUDE.md)를 참조하세요.

## 🤝 기여하기

1. 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 📄 라이선스

이 프로젝트는 오픈 소스이며 [MIT License](LICENSE) 하에 제공됩니다.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [Prism.js](https://prismjs.com/) - 구문 강조
- [Lucide](https://lucide.dev/) - 아름다운 아이콘
- [Fuse.js](https://fusejs.io/) - 퍼지 검색 라이브러리

## 📞 지원

설정에 대한 질문이나 도움이 필요하시면 [이슈를 열어주시거나](https://github.com/yourusername/tech-blog/issues) 블로그의 연락처 페이지를 통해 연락해 주세요.

---

Next.js로 ❤️와 함께 제작되었으며 GitHub Pages에 배포되었습니다.
