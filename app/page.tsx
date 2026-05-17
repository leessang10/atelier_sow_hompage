import { getPublishedProjectArchive } from '@/lib/supabase';
import { SupabaseProject } from '@/types/project.types';
import { HomeArchive } from '@/widgets/home-archive/ui/home-archive';

// 공개 포트폴리오는 자주 바뀌지 않으므로 재검증 빈도를 낮춘다.
export const revalidate = 3600;

export default async function Home() {
  let projects: SupabaseProject[] = [];
  let error = null;

  try {
    projects = await getPublishedProjectArchive();
  } catch (e) {
    console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', e);
    error = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f4ef] px-6">
        <div className="text-center">
          <p className="mb-4 text-sm text-red-600">{error}</p>
          <p className="text-sm text-neutral-500">잠시 후 다시 시도해주세요.</p>
        </div>
      </main>
    );
  }

  return <HomeArchive projects={projects} />;
}
