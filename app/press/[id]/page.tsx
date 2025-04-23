import { getPressItem } from '@/lib/notion/notion';
import PageHeader from '../../../components/PageHeader';
import { notFound } from 'next/navigation';
import PressDetailClient from './PressDetailClient';
// 페이지 동적 설정
export const revalidate = 10; // 10초마다 재검증

interface PressDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PressDetailPage({ params }: PressDetailPageProps) {
  const resolvedParams = await params;
  const pressItem = await getPressItem(resolvedParams.id);

  if (!pressItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title="보도자료 상세" description={pressItem.title} />
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <PressDetailClient pressItem={pressItem} />
        </div>
      </section>
    </main>
  );
}
