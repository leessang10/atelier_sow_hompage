// 기존 NotionBlock 타입 정의 (호환성 유지)
export interface NotionBlock {
  type: string;
  text: string;
  url?: string;
  caption?: string;
}

// 기존 PressItem 타입 (호환성 유지)
export interface PressItem {
  id: string;
  title: string;
  content: NotionBlock[];
  date: string;
  source: string;
  category?: 'news' | 'article' | 'interview';
  thumbnail?: string;
  link?: string;
  published: boolean;
}

// Supabase Press 테이블용 새로운 타입들 (Projects 타입과 통일감 있게 설계)
export interface SupabasePressItem {
  id: number;
  created_at: string;
  title: string;
  subtitle?: string;
  category: 'AWARD' | 'NEWS' | 'INTERVIEW' | 'EVENT';
  main_image: string;
  is_published: boolean;
  body: any; // Tiptap JSON 형식
  published_date: string; // YYYY-MM-DD 형식
  source?: string;
  link?: string;
  excerpt?: string; // 미리보기 텍스트
}

export interface PressFilter {
  category: string | null;
  year: string | null;
}
