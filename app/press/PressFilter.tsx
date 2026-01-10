'use client';

import type { PressFilter } from './types';
import { motion } from 'framer-motion';

interface PressFilterProps {
  filter: PressFilter;
  onFilterChange: (filter: PressFilter) => void;
  availableYears: string[];
}

const categories = [
  { id: null, label: '전체' },
  { id: 'AWARD', label: '수상' },
  { id: 'NEWS', label: '뉴스' },
  { id: 'INTERVIEW', label: '인터뷰' },
  { id: 'EVENT', label: '이벤트' },
];

export default function PressFilter({ filter, onFilterChange, availableYears }: PressFilterProps) {
  const years = [{ id: null, label: '전체 연도' }, ...availableYears.map(y => ({ id: y, label: `${y}년` }))];

  return (
    <div className="space-y-6 mb-12">
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 w-full md:w-auto mb-1 md:mb-0">Category</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id || 'all'}
              onClick={() => onFilterChange({ ...filter, category: cat.id })}
              className={`relative px-4 py-1.5 text-sm transition-colors duration-300 ${
                filter.category === cat.id
                  ? 'text-white dark:text-black'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
              {filter.category === cat.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 연도 필터 */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 w-full md:w-auto mb-1 md:mb-0">Year</span>
        <div className="flex flex-wrap gap-2">
          {years.map((y) => (
            <button
              key={y.id || 'all-years'}
              onClick={() => onFilterChange({ ...filter, year: y.id })}
              className={`relative px-4 py-1.5 text-sm transition-colors duration-300 ${
                filter.year === y.id
                  ? 'text-white dark:text-black'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="relative z-10">{y.label}</span>
              {filter.year === y.id && (
                <motion.div
                  layoutId="activeYear"
                  className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* 구분선 */}
      <div className="pt-4">
        <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
}
