'use server'

import {supabase} from '@/lib/supabase'
import {Project} from '@/types/project.types'

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
      .from('Projects')
      .select('id, title, subtitle, main_image, created_at, is_published')
      .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error)
    throw new Error('프로젝트 데이터를 불러오지 못했습니다.')
  }

  return data as Project[]
}
