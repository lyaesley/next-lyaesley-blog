import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { I18nProvider } from "@/contexts/i18n-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "코드어필(Code Appeal) - 현대적인 웹 개발",
  description: "현대적인 웹 개발, JavaScript, TypeScript, React 등을 다루는 기술 블로그입니다.",
  keywords: ["웹 개발", "자바스크립트", "타입스크립트", "리액트", "넥스트JS", "프로그래밍"],
  authors: [{ name: "코드어필" }],
  creator: "코드어필",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://yourusername.github.io/tech-blog",
    title: "코드어필(Code Appeal) - 현대적인 웹 개발",
    description: "현대적인 웹 개발, JavaScript, TypeScript, React 등을 다루는 기술 블로그입니다.",
    siteName: "코드어필",
  },
  twitter: {
    card: "summary_large_image",
    title: "코드어필(Code Appeal) - 현대적인 웹 개발",
    description: "현대적인 웹 개발, JavaScript, TypeScript, React 등을 다루는 기술 블로그입니다.",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <I18nProvider defaultLocale="ko">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}