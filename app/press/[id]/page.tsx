import { Metadata } from 'next';
import { getPressItem } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import PressDetailClient from './PressDetailClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 메타데이터 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pressItem = await getPressItem(parseInt(id));

  if (!pressItem) {
    return {
      title: '보도자료를 찾을 수 없습니다 - SOW',
    };
  }

  return {
    title: `${pressItem.title} - SOW`,
    description: pressItem.subtitle || pressItem.excerpt || '보도자료',
    openGraph: {
      title: pressItem.title,
      description: pressItem.subtitle || pressItem.excerpt || '보도자료',
      images: pressItem.main_image ? [pressItem.main_image] : [],
    },
  };
}

export default async function PressDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pressId = parseInt(id);

  // ID가 유효한 숫자인지 확인
  if (isNaN(pressId)) {
    notFound();
  }

  const pressItem = await getPressItem(pressId);

  if (!pressItem) {
    notFound();
  }

  return <PressDetailClient pressItem={pressItem} />;
}
