'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SupabasePressItem, PressFilter as PressFilterType } from './types';
import PressFilter from './PressFilter';

interface PressClientProps {
  initialPressItems: SupabasePressItem[];
}

// 카테고리 한글 매핑
const categoryLabels = {
  AWARD: '수상',
  NEWS: '뉴스',
  INTERVIEW: '인터뷰',
  EVENT: '이벤트',
} as const;

export function PressClient({ initialPressItems }: PressClientProps) {
  const [pressItems] = useState<SupabasePressItem[]>(initialPressItems);
  const [filters, setFilters] = useState<PressFilterType>({
    category: null,
    year: null,
  });

  // 필터링된 아이템들
  const filteredItems = useMemo(() => {
    return pressItems.filter((item) => {
      const categoryMatch = !filters.category || item.category === filters.category;
      const yearMatch = !filters.year || item.published_date.startsWith(filters.year);

      return categoryMatch && yearMatch;
    });
  }, [pressItems, filters]);

  // 연도별 그룹화
  const groupedItems = useMemo(() => {
    const groups: Record<string, SupabasePressItem[]> = {};
    filteredItems.forEach((item) => {
      const year = item.published_date.substring(0, 4);
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return groups;
  }, [filteredItems]);

  // 정렬된 연도 목록 (내림차순)
  const sortedYears = useMemo(() => {
    return Object.keys(groupedItems).sort((a, b) => b.localeCompare(a));
  }, [groupedItems]);

  // 필터용 전체 연도 목록
  const availableYears = useMemo(() => {
    return Array.from(new Set(pressItems.map((item) => item.published_date.substring(0, 4)))).sort((a, b) => b.localeCompare(a));
  }, [pressItems]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-10 bg-white dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto px-4">
        {/* 필터 */}
        <div className="mb-20">
             <PressFilter filter={filters} onFilterChange={setFilters} availableYears={availableYears} />
        </div>
       
        {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">조건에 맞는 보도자료가 없습니다.</p>
            </div>
        ) : (
          <div className="space-y-20 relative">
             {/* 수직 타임라인 선 (데스크톱) */}
            <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

            {sortedYears.map((year) => (
              <div key={year} className="relative">
                 {/* 연도 표시 (Sticky) */}
                <div className="md:absolute md:left-0 md:top-0 md:w-[100px] md:text-right mb-8 md:mb-0">
                  <div className="sticky top-24 inline-block">
                    <span className="text-4xl md:text-5xl font-bold text-gray-200 dark:text-gray-700 leading-none">
                      {year}
                    </span>
                  </div>
                </div>

                {/* 해당 연도의 아이템들 */}
                <div className="md:ml-[160px] space-y-12">
                  {groupedItems[year].map((item, index) => (
                    <motion.article 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/press/${item.id}`} className="block">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                          {/* 썸네일 (카드 스타일) */}
                          <div className="w-full md:w-[280px] shrink-0">
                            <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-all duration-300">
                                {item.main_image ? (
                                    <Image 
                                        src={item.main_image} 
                                        alt={item.title} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-gray-400 dark:text-gray-600 text-sm">No Image</span>
                                    </div>
                                )}
                                {/* 카테고리 뱃지 (썸네일 위) */}
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm">
                                        {categoryLabels[item.category]}
                                    </span>
                                </div>
                            </div>
                          </div>

                          {/* 텍스트 콘텐츠 (매거진 스타일) */}
                          <div className="flex-1 min-w-0 py-2">
                             <div className="flex items-center gap-3 mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <time>{formatDate(item.published_date)}</time>
                                {item.source && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                        <span>{item.source}</span>
                                    </>
                                )}
                             </div>

                             <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.title}
                             </h3>

                             {item.subtitle && (
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-3 font-medium">
                                    {item.subtitle}
                                </p>
                             )}

                             {item.excerpt && (
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 md:line-clamp-3">
                                    {item.excerpt}
                                </p>
                             )}
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
