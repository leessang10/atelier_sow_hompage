import PageHeader from '../../components/PageHeader';
import { getProjects } from '@/lib/notion/notion';
import ProjectGrid from './ProjectGrid';
import { Project } from './types';

// 페이지 동적 설정
export const revalidate = 10; // 10초마다 재검증

export default async function Projects() {
  let projects: Project[] = [];
  let error = null;

  try {
    projects = await getProjects();
  } catch (e) {
    console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', e);
    error = e;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title="프로젝트" description="Architecture + Interior + Branding" />
      <section className="py-2 px-2">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 mb-4">프로젝트를 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-gray-500 dark:text-gray-400">잠시 후 다시 시도해주세요.</p>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </section>
    </main>
  );
}
