import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title="보도자료를 찾을 수 없습니다" description="요청하신 보도자료가 존재하지 않습니다" />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">보도자료를 찾을 수 없습니다</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">요청하신 보도자료가 존재하지 않거나 삭제되었을 수 있습니다. 다른 보도자료들을 확인해보세요.</p>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/press" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              보도자료 목록으로 돌아가기
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
