import type { PressFilter } from './types';

interface PressFilterProps {
  filter: PressFilter;
  onFilterChange: (filter: PressFilter) => void;
  availableYears: string[];
}

export default function PressFilter({ filter, onFilterChange, availableYears }: PressFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <select
        value={filter.category || ''}
        onChange={(e) => onFilterChange({ ...filter, category: e.target.value || null })}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300"
      >
        <option value="">모든 카테고리</option>
        <option value="news">뉴스</option>
        <option value="article">기사</option>
        <option value="interview">인터뷰</option>
      </select>

      <select
        value={filter.year || ''}
        onChange={(e) => onFilterChange({ ...filter, year: e.target.value || null })}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300"
      >
        <option value="">모든 연도</option>
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}년
          </option>
        ))}
      </select>
    </div>
  );
}
