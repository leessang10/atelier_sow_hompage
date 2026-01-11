import {SupabasePressItem} from '@/app/press/types';
import {ContactFormData, SupabaseContact, SupabaseProject} from '@/types/project.types';
import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// ========== Projects 관련 함수들 ==========

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

// ========== Press 관련 함수들 ==========

// 발행된 보도자료 목록 가져오기
export const getPublishedPressItems = async (): Promise<SupabasePressItem[]> => {
  const { data, error } = await supabase.from('Press').select('*').eq('is_published', true).order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching Press items:', error);
    throw error;
  }

  return data || [];
};

// 특정 보도자료 가져오기
export const getPressItem = async (id: number): Promise<SupabasePressItem | null> => {
  const { data, error } = await supabase.from('Press').select('*').eq('id', id).eq('is_published', true).single();

  if (error) {
    console.error('Error fetching Press item:', error);
    return null;
  }

  return data;
};

// 카테고리별 보도자료 가져오기
export const getPressItemsByCategory = async (category: string): Promise<SupabasePressItem[]> => {
  const { data, error } = await supabase.from('Press').select('*').eq('category', category).eq('is_published', true).order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching Press items by category:', error);
    throw error;
  }

  return data || [];
};

// 연도별 보도자료 가져오기
export const getPressItemsByYear = async (year: string): Promise<SupabasePressItem[]> => {
  const { data, error } = await supabase
    .from('Press')
    .select('*')
    .gte('published_date', `${year}-01-01`)
    .lte('published_date', `${year}-12-31`)
    .eq('is_published', true)
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching Press items by year:', error);
    throw error;
  }

  return data || [];
};

// ========== Contact 관련 함수들 ==========

// 새로운 문의 생성
export const createContact = async (contactData: ContactFormData): Promise<SupabaseContact> => {
  const { data, error } = await supabase.from('Contacts').insert([contactData]).select().single();

  if (error) {
    console.error('Error creating contact:', error);
    throw error;
  }

  return data;
};

// 모든 문의 목록 가져오기 (인증된 사용자용)
export const getAllContacts = async (): Promise<SupabaseContact[]> => {
  const { data, error } = await supabase.from('Contacts').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }

  return data || [];
};

// 특정 문의 가져오기 (인증된 사용자용)
export const getContact = async (id: number): Promise<SupabaseContact | null> => {
  const { data, error } = await supabase.from('Contacts').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching contact:', error);
    return null;
  }

  return data;
};

// 문의 상태 업데이트 (인증된 사용자용)
export const updateContactStatus = async (id: number, status: SupabaseContact['status'], isRead?: boolean): Promise<SupabaseContact | null> => {
  const updates: Partial<SupabaseContact> = { status };
  if (isRead !== undefined) {
    updates.is_read = isRead;
  }

  const { data, error } = await supabase.from('Contacts').update(updates).eq('id', id).select().single();

  if (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }

  return data;
};

// 읽지 않은 문의 개수 가져오기 (인증된 사용자용)
export const getUnreadContactCount = async (): Promise<number> => {
  const { count, error } = await supabase.from('Contacts').select('*', { count: 'exact', head: true }).eq('is_read', false);

  if (error) {
    console.error('Error fetching unread contact count:', error);
    return 0;
  }

  return count || 0;
};
