'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PressFilter from './PressFilter';
import type { PressFilter as PressFilterType, PressItem } from './types';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface PressClientProps {
  pressItems: PressItem[];
}

export default function PressClient({ pressItems }: PressClientProps) {
  const [filter, setFilter] = useState<PressFilterType>({
    category: null,
    year: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 사용 가능한 연도 목록 생성
  const availableYears = [...new Set(pressItems.map((item) => new Date(item.date).getFullYear().toString()))].sort((a, b) => b.localeCompare(a));

  // 필터링된 아이템
  const filteredItems = pressItems.filter((item) => {
    if (filter.category && item.category !== filter.category) return false;
    if (filter.year && new Date(item.date).getFullYear().toString() !== filter.year) return false;
    return true;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // 필터 변경 시 페이지 초기화
  const handleFilterChange = (newFilter: PressFilterType) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 컨텐츠 미리보기 텍스트 추출 함수
  const getContentPreview = (content: any) => {
    if (!content || !Array.isArray(content) || content.length === 0) {
      return '내용이 없습니다.';
    }

    // 첫 번째 텍스트 블록 찾기
    const textBlock = content.find((block) => block.type === 'paragraph' || block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3');

    if (textBlock && textBlock.text) {
      return textBlock.text;
    }

    return '내용이 없습니다.';
  };

  return (
    <>
      <PressFilter filter={filter} onFilterChange={handleFilterChange} availableYears={availableYears} />

      {currentItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">필터 조건에 맞는 보도자료가 없습니다.</p>
        </div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8">
          {currentItems.map((pressItem) => {
            const imageUrl = pressItem.thumbnail;
            const contentPreview = getContentPreview(pressItem.content);

            return (
              <motion.article key={pressItem.id} variants={item} className="flex flex-col md:flex-row gap-6 bg-gray-50 dark:bg-dark-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {imageUrl && (
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image src={imageUrl} alt={pressItem.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{new Date(pressItem.date).toLocaleDateString('ko-KR')}</span>
                    <span>|</span>
                    <span>{pressItem.source}</span>
                    <span>|</span>
                    <span className="capitalize">{pressItem.category}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    <Link href={`/press/${pressItem.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {pressItem.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{contentPreview}</p>
                  <div className="flex justify-between items-center">
                    <Link href={`/press/${pressItem.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      자세히 보기 →
                    </Link>
                    {pressItem.link && (
                      <a href={pressItem.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        원문 보기
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1 ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              다음
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
