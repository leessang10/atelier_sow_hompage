import {SupabasePressItem} from '@/app/press/types';
import {ContactFormData, SupabaseContact, SupabaseProject} from '@/types/project.types';
import {createClient} from '@supabase/supabase-js';
import { cache } from 'react';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const PROJECT_LIST_SELECT = 'id, created_at, title, subtitle, main_image, is_published';
const PROJECT_DETAIL_SELECT = `${PROJECT_LIST_SELECT}, body`;
const PRESS_LIST_SELECT = 'id, created_at, title, category, main_image:thumbnail, is_published, published_date, source, link, excerpt';
const PRESS_DETAIL_SELECT = `${PRESS_LIST_SELECT}, body:content`;

const fetchPublishedProjects = cache(async (): Promise<SupabaseProject[]> => {
  const { data, error } = await supabase
    .from('Projects')
    .select(PROJECT_LIST_SELECT)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw new Error('프로젝트를 불러오는데 실패했습니다.');
  }

  return data || [];
});

const fetchProject = cache(async (id: string): Promise<SupabaseProject | null> => {
  const { data, error } = await supabase
    .from('Projects')
    .select(PROJECT_DETAIL_SELECT)
    .eq('id', parseInt(id))
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching project:', error);
    throw new Error('프로젝트를 불러오는데 실패했습니다.');
  }

  return data;
});

const fetchPublishedPressItems = cache(async (): Promise<SupabasePressItem[]> => {
  const { data, error } = await supabase
    .from('Press')
    .select(PRESS_LIST_SELECT)
    .eq('is_published', true)
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching Press items:', error);
    throw error;
  }

  return data || [];
});

const fetchPressItem = cache(async (id: number): Promise<SupabasePressItem | null> => {
  const { data, error } = await supabase
    .from('Press')
    .select(PRESS_DETAIL_SELECT)
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching Press item:', error);
    return null;
  }

  return data;
});

// ========== Projects 관련 함수들 ==========

// 발행된 프로젝트 목록 가져오기
export async function getPublishedProjects(): Promise<SupabaseProject[]> {
  return fetchPublishedProjects();
}

// 특정 프로젝트 가져오기
export async function getProject(id: string): Promise<SupabaseProject | null> {
  return fetchProject(id);
}

// ========== Press 관련 함수들 ==========

// 발행된 보도자료 목록 가져오기
export const getPublishedPressItems = async (): Promise<SupabasePressItem[]> => {
  return fetchPublishedPressItems();
};

// 특정 보도자료 가져오기
export const getPressItem = async (id: number): Promise<SupabasePressItem | null> => {
  return fetchPressItem(id);
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
