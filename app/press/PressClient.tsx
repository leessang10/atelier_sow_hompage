'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  // 연도 목록 생성
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(pressItems.map((item) => item.published_date.substring(0, 4)))).sort((a, b) => b.localeCompare(a));
    return years;
  }, [pressItems]);

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
      <div className="max-w-6xl mx-auto">
        {/* 필터 */}
        <PressFilter filter={filters} onFilterChange={setFilters} availableYears={availableYears} />

        {/* 보도자료 목록 */}
        <div className="grid gap-8 md:gap-12">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">조건에 맞는 보도자료가 없습니다.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <article key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
                <Link href={`/press/${item.id}`} className="block group">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* 이미지 */}
                    <div className="md:col-span-1">
                      <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                        {item.main_image ? (
                          <Image src={item.main_image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-600">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">{categoryLabels[item.category]}</span>
                        <time className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.published_date)}</time>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h2>

                      {item.subtitle && <p className="text-gray-600 dark:text-gray-400 mb-3">{item.subtitle}</p>}

                      {item.excerpt && <p className="text-gray-600 dark:text-gray-400 mb-4">{item.excerpt}</p>}

                      {item.source && <p className="text-sm text-gray-500 dark:text-gray-400">출처: {item.source}</p>}
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
