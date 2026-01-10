import { getProject } from '@/lib/supabase';
import { SupabaseProject } from '@/types/project.types';
import PageHeader from '@/components/PageHeader';
import TiptapRenderer from '@/components/TiptapRenderer';
import ProjectSocials from '@/components/ProjectSocials';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

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

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title={project.title} description={project.subtitle || ''} />

      {/* 메인 이미지 */}
      <div className="relative aspect-video w-full mb-16 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Image src={project.main_image} alt={project.title} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-20 flex flex-col lg:flex-row gap-8 relative">
        {/* 프로젝트 정보 및 내용 */}
        <div className="flex-1 w-full lg:max-w-5xl mx-auto bg-gray-50 dark:bg-dark-card p-8 rounded-lg">
          {/* 프로젝트 메타 정보 */}
          <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h1>
                {project.subtitle && <p className="text-xl text-gray-600 dark:text-gray-300">{project.subtitle}</p>}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  게시일:{' '}
                  {new Date(project.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Tiptap 콘텐츠 렌더링 */}
          <div className="max-w-none">
            {project.body ? (
              <TiptapRenderer content={project.body} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">콘텐츠가 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Sidebar */}
        <div className="hidden lg:block w-16 relative">
          <div className="sticky top-32">
            <ProjectSocials />
          </div>
        </div>
      </div>
    </main>
  );
}
