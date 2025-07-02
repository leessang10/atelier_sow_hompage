import { getPublishedProjects } from '@/lib/supabase';
import { SupabaseProject } from '@/types/project.types';
import PageHeader from '@/components/PageHeader';
import ProjectGrid from './ProjectGrid';

// 페이지 동적 설정 - Supabase 데이터가 실시간으로 변경될 수 있으므로 revalidate 설정
export const revalidate = 60; // 60초마다 재검증

export default async function ProjectsV3() {
  let projects: SupabaseProject[] = [];
  let error = null;

  try {
    projects = await getPublishedProjects();
    console.log('Loaded projects:', projects.length);
  } catch (e) {
    console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', e);
    error = e;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title="Projects V3" description="Supabase로 관리되는 최신 프로젝트들을 확인해보세요" />
      <section className="py-2 px-2">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 mb-4">프로젝트를 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-gray-500 dark:text-gray-400">잠시 후 다시 시도해주세요.</p>
            <div className="mt-4 text-sm text-gray-400">{error instanceof Error ? error.message : '알 수 없는 오류'}</div>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </section>
    </main>
  );
}
