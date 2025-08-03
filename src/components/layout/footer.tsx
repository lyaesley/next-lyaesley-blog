"use client";

import Link from "next/link";
import { createT } from "@/lib/translations";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { categoryToSlug } from "@/lib/slugify";

export function Footer() {
  const t = createT("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                코드어필
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("description")}
            </p>
          </div>

          {/* 바로가기 링크 */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("allPosts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("categories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("tags")}
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("search")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 카테고리 */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("categoriesTitle")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/categories/${categoryToSlug("웹 개발")}`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("webDevelopment")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/categories/${categoryToSlug("JavaScript")}`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("javascript")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/categories/${categoryToSlug("React")}`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("react")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/categories/${categoryToSlug("튜토리얼")}`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("tutorials")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("connect")}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} 코드어필(Code Appeal). {t("allRightsReserved")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                {t("termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
