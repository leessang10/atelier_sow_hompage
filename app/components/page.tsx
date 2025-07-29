import type { Metadata } from 'next';
import ComponentShowcase from './ComponentShowcase';

export const metadata: Metadata = {
  title: 'Components - SOW',
  description: 'Common UI components based on SOW design system',
  robots: 'noindex, nofollow', // Hide from search engines
};

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
            SOW Design System Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            아키텍처 가이드 기반 공통 컴포넌트 라이브러리
          </p>
        </div>
        <ComponentShowcase />
      </div>
    </div>
  );
}