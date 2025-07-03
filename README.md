# SOW Project

> 건축 사무소 SOW의 공식 웹사이트

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deployment**: Vercel

## 주요 기능

### 1. 프로젝트 관리 (Projects V3)

- Supabase 기반 프로젝트 데이터 관리
- Tiptap 에디터로 작성된 리치 텍스트 콘텐츠
- 반응형 프로젝트 그리드 및 상세 페이지
- 동적 메타데이터 생성으로 SEO 최적화

### 2. 보도자료 시스템 (Press)

- Supabase 기반 보도자료 관리
- 카테고리별 필터링 (수상, 뉴스, 인터뷰, 이벤트)
- 연도별 필터링
- Tiptap 리치 텍스트 렌더링

### 3. 문의 시스템 (Contact)

- Supabase 기반 문의 데이터 저장
- 실시간 문의 접수 및 상태 관리
- 관리자용 문의 조회/처리 기능
- 이메일 및 연락처 검증

### 4. 기타 페이지

- 회사 소개 (About)
- 프로세스 안내 (Process)
- 연락처 (Contact) - Google Maps 연동

## 데이터베이스 스키마

### Projects 테이블

```sql
CREATE TABLE Projects (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  subtitle text,
  main_image text NOT NULL,
  is_published boolean DEFAULT false NOT NULL,
  body jsonb
);

-- RLS 정책 설정
ALTER TABLE Projects ENABLE ROW LEVEL SECURITY;

-- 발행된 프로젝트만 읽기 허용
CREATE POLICY "Enable read access for published projects" ON Projects
  FOR SELECT USING (is_published = true);
```

### Press 테이블

```sql
CREATE TABLE press (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  subtitle text,
  category text NOT NULL CHECK (category IN ('AWARD', 'NEWS', 'INTERVIEW', 'EVENT')),
  main_image text NOT NULL,
  is_published boolean DEFAULT false NOT NULL,
  body jsonb,
  published_date date NOT NULL,
  source text,
  link text,
  excerpt text
);

-- RLS 정책 설정
ALTER TABLE press ENABLE ROW LEVEL SECURITY;

-- 비회원: 발행된 보도자료만 읽기 가능
CREATE POLICY "Allow anonymous users to view published press items" ON press
  FOR SELECT TO anon USING (is_published = true);

-- 인증된 사용자: 모든 항목 조회/편집 가능
CREATE POLICY "Allow authenticated users full access" ON press
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

### Contact 테이블

```sql
CREATE TABLE contact (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'ARCHIVED')),
  is_read boolean DEFAULT false NOT NULL
);

-- RLS 정책 설정
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- 비회원: 새로운 문의 생성만 가능
CREATE POLICY "Allow anonymous users to submit contact forms" ON contact
  FOR INSERT TO anon WITH CHECK (true);

-- 인증된 사용자: 모든 문의 조회/수정 가능
CREATE POLICY "Allow authenticated users full access to contacts" ON contact
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

## 권한 시스템 (RLS)

### 🔓 비회원 사용자 (anon)

- **Projects**: 발행된 프로젝트만 읽기 가능
- **Press**: 발행된 보도자료만 읽기 가능
- **Contact**: 새로운 문의 생성만 가능

### 🔐 인증된 사용자 (authenticated)

- **Projects**: 모든 프로젝트 조회/편집 가능
- **Press**: 모든 보도자료 조회/편집 가능
- **Contact**: 모든 문의 조회/처리 가능

## 프로젝트 구조

```
sow_project/
├── app/                          # Next.js App Router
│   ├── projects/v3/             # 프로젝트 페이지 (Supabase 버전)
│   ├── press/                   # 보도자료 페이지
│   ├── contact/                 # 문의 페이지
│   ├── about/                   # 회사 소개
│   └── process/                 # 프로세스 안내
├── components/                   # 공통 컴포넌트
│   ├── TiptapRenderer.tsx       # Tiptap JSON 렌더러
│   ├── Navigation.tsx           # 네비게이션
│   └── Footer.tsx              # 푸터
├── lib/                         # 유틸리티 함수
│   └── supabase.ts             # Supabase 클라이언트 및 API 함수
├── types/                       # TypeScript 타입 정의
│   └── project.types.ts        # 모든 타입 정의
└── api/                         # API 라우트
    └── contact/                 # 문의 API
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 배포

Vercel을 통한 자동 배포가 설정되어 있습니다.

## 주요 변경사항

### v3 업데이트

- Projects 시스템을 Supabase 기반으로 마이그레이션
- Tiptap 에디터 지원으로 리치 텍스트 콘텐츠 제공
- 서버 컴포넌트 기반 성능 최적화

### Press 시스템 업데이트

- Notion 기반에서 Supabase 기반으로 마이그레이션
- 통일된 데이터 스키마로 일관성 향상
- 카테고리 및 연도별 필터링 기능

### Contact 시스템 업데이트

- 이메일 기반에서 Supabase 데이터베이스 저장으로 변경
- 실시간 문의 상태 관리 시스템 구축
- 관리자용 문의 처리 인터페이스 준비
- 통일된 데이터 스키마 적용
