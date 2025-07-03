'use client';

import Image from 'next/image';
import Link from 'next/link';
import TiptapRenderer from '@/components/TiptapRenderer';
import { SupabasePressItem } from '../types';

interface PressDetailClientProps {
  pressItem: SupabasePressItem;
}

// 카테고리 한글 매핑
const categoryLabels = {
  AWARD: '수상',
  NEWS: '뉴스',
  INTERVIEW: '인터뷰',
  EVENT: '이벤트',
} as const;

export default function PressDetailClient({ pressItem }: PressDetailClientProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-white dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로 가기 버튼 */}
        <div className="mb-8">
          <Link href="/press" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            ← 목록으로 돌아가기
          </Link>
        </div>

        {/* 메인 이미지 */}
        {pressItem.main_image && (
          <div className="mb-8">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <Image src={pressItem.main_image} alt={pressItem.title} fill className="object-cover" priority />
            </div>
          </div>
        )}

        {/* 헤더 정보 */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium">{categoryLabels[pressItem.category]}</span>
            <time>{formatDate(pressItem.published_date)}</time>
            {pressItem.source && (
              <>
                <span>|</span>
                <span>출처: {pressItem.source}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{pressItem.title}</h1>

          {pressItem.subtitle && <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{pressItem.subtitle}</p>}

          {pressItem.link && (
            <div className="mb-6">
              <a
                href={pressItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                원문 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </header>

        {/* 콘텐츠 */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {pressItem.body ? <TiptapRenderer content={pressItem.body} /> : <p className="text-gray-500 dark:text-gray-400">콘텐츠가 없습니다.</p>}
        </div>

        {/* 하단 네비게이션 */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <Link
            href="/press"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
