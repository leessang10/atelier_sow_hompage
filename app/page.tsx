import { getPublishedProjects } from '@/lib/supabase';
import { SupabaseProject } from '@/types/project.types';
import ProjectSlider from '@/components/ProjectSlider';

// 페이지 재검증 설정 (60초마다)
export const revalidate = 60;

export default async function Home() {
  let projects: SupabaseProject[] = [];
  let error = null;

  try {
    projects = await getPublishedProjects();
  } catch (e) {
    console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', e);
    error = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors relative overflow-hidden">
      {error ? (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <p className="text-gray-500 dark:text-gray-400">잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      ) : (
        <ProjectSlider projects={projects} />
      )}

      <section className="py-20 px-4 bg-white dark:bg-dark-bg relative z-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">본질에 다가가는 건축을 만듭니다</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">공간의 본질을 담다</h3>
              <p className="text-gray-600 dark:text-gray-400">내·외부의 경계를 넘어서는 공간을 만듭니다. 건축과 공간을 기반으로 모든 디자인 요소를 섬세하게 다루어 새로운 가치를 창조합니다.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">정성을 심다</h3>
              <p className="text-gray-600 dark:text-gray-400">각 프로젝트에 정성과 혼을 담아 삶에 영감을 주는 공간을 만들어갑니다. 이것이 우리가 추구하는 건축입니다.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
