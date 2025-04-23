// NotionBlock 타입 정의
export interface NotionBlock {
  type: string;
  text: string;
  url?: string;
  caption?: string;
}

export interface PressItem {
  id: string;
  title: string;
  content: NotionBlock[];
  date: string;
  source: string;
  category: 'news' | 'article' | 'interview';
  thumbnail?: string;
  link?: string;
}

export interface PressFilter {
  category: string | null;
  year: string | null;
}
