import { getPublishedPressItems } from '@/lib/supabase';
import { SupabasePressItem } from '@/app/press/types';
import PageHeader from '../../components/PageHeader';
import { PressClient } from './PressClient';

// 페이지 동적 설정 - Supabase 데이터가 실시간으로 변경될 수 있으므로 revalidate 설정
export const revalidate = 300; // 5분마다 재검증

export default async function Press() {
  let pressItems: SupabasePressItem[] = [];
  let error = null;

  try {
    pressItems = await getPublishedPressItems();
    console.log('Loaded press items:', pressItems.length);
  } catch (e) {
    console.error('보도자료를 불러오는 중 오류가 발생했습니다:', e);
    error = e;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title="" description="" />
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400 mb-4">보도자료를 불러오는 중 오류가 발생했습니다.</p>
              <p className="text-gray-500 dark:text-gray-400">잠시 후 다시 시도해주세요.</p>
              <div className="mt-4 text-sm text-gray-400">{error instanceof Error ? error.message : '알 수 없는 오류'}</div>
            </div>
          ) : (
            <PressClient initialPressItems={pressItems} />
          )}
        </div>
      </section>
    </main>
  );
}
