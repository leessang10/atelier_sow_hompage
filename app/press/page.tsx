import { getPressItems } from '@/lib/notion/notion';
import PageHeader from '../../components/PageHeader';
import PressClient from './PressClient';
import { PressItem } from './types';

// 페이지 동적 설정
export const revalidate = 10; // 10초마다 재검증

export default async function Press() {
  let pressItems: PressItem[] = [];
  let error = null;

  try {
    pressItems = await getPressItems();
  } catch (e) {
    console.error('보도자료를 불러오는 중 오류가 발생했습니다:', e);
    error = e;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title="보도자료" description="SOW의 미디어 커버리지 및 뉴스" />
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400 mb-4">보도자료를 불러오는 중 오류가 발생했습니다.</p>
              <p className="text-gray-500 dark:text-gray-400">잠시 후 다시 시도해주세요.</p>
            </div>
          ) : (
            <PressClient pressItems={pressItems} />
          )}
        </div>
      </section>
    </main>
  );
}
