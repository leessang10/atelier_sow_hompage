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
    </main>
  );
}
