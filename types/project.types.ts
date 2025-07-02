export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  main_image: string;
  created_at?: string;
  is_published?: boolean;
}

export interface ProjectDetail extends Project {
  content: {
    type: string;
    text: string;
  }[];
}

// Supabase projects 테이블용 새로운 타입들
export interface SupabaseProject {
  id: number;
  created_at: string;
  title: string;
  subtitle?: string;
  main_image: string;
  is_published: boolean;
  body: any; // Tiptap JSON 형식
}

// Tiptap JSON 구조를 위한 타입
export interface TiptapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapNode[];
  text?: string;
  marks?: Array<{
    type: string;
    attrs?: Record<string, any>;
  }>;
}

export interface TiptapDocument {
  type: 'doc';
  content: TiptapNode[];
}
