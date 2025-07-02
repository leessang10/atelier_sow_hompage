import { SupabaseProject } from '@/types/project.types';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// 발행된 프로젝트 목록 가져오기
export async function getPublishedProjects(): Promise<SupabaseProject[]> {
  const { data, error } = await supabase.from('Projects').select('*').eq('is_published', true).order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw new Error('프로젝트를 불러오는데 실패했습니다.');
  }

  return data || [];
}

// 특정 프로젝트 가져오기
export async function getProject(id: string): Promise<SupabaseProject | null> {
  const { data, error } = await supabase.from('Projects').select('*').eq('id', parseInt(id)).eq('is_published', true).single();

  if (error) {
    if (error.code === 'PGRST116') {
      // 데이터를 찾을 수 없음
      return null;
    }
    console.error('Error fetching project:', error);
    throw new Error('프로젝트를 불러오는데 실패했습니다.');
  }

  return data;
}
