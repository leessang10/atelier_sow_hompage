import { getProject } from '@/lib/supabase';
import { SupabaseProject } from '@/types/project.types';
import { ProjectDetailExperience } from '@/widgets/project-detail/ui/project-detail-experience';
import { notFound } from 'next/navigation';

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600;

// 동적 메타데이터 생성
export async function generateMetadata({ params }: ProjectDetailProps) {
  const { id } = await params;

  try {
    const project = await getProject(id);

    if (!project) {
      return {
        title: '프로젝트를 찾을 수 없습니다',
        description: '요청하신 프로젝트가 존재하지 않습니다.',
      };
    }

    return {
      title: project.title,
      description: project.subtitle || project.title,
      openGraph: {
        title: project.title,
        description: project.subtitle || project.title,
        images: [project.main_image],
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 중 오류:', error);
    return {
      title: '프로젝트',
      description: '프로젝트 상세 정보',
    };
  }
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = await params;
  let project: SupabaseProject | null = null;
  let error = null;

  try {
    project = await getProject(id);
  } catch (e) {
    console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', e);
    error = e;
  }

  if (!project && !error) {
    notFound();
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">오류가 발생했습니다</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">프로젝트를 불러오는 중 문제가 발생했습니다.</p>
            <div className="text-sm text-gray-400">{error instanceof Error ? error.message : '알 수 없는 오류'}</div>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return null; // notFound()가 이미 호출됨
  }

  return <ProjectDetailExperience project={project} />;
}
