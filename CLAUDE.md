# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

건축 사무소 SOW의 공식 웹사이트 - Next.js 15 App Router와 Supabase를 활용한 현대적인 웹 애플리케이션

## Development Commands

```bash
# Development
yarn dev                    # Start development server with Turbo
yarn build                  # Build for production
yarn start                  # Start production server
yarn lint                   # Run ESLint
yarn test                   # Run Jest tests

# Environment setup
yarn vercel:env:pull        # Pull environment variables from Vercel
```

## Tech Stack & Architecture

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with dark mode support
- **Database**: Supabase with Row Level Security (RLS)
- **Deployment**: Vercel
- **Testing**: Jest with ts-jest
- **Package Manager**: Yarn

### Database Architecture (Supabase)

#### Three Main Tables:
1. **Projects** - Portfolio projects with Tiptap rich content
2. **Press** - News articles with category filtering  
3. **Contact** - Contact form submissions with status tracking

#### Permission System (RLS):
- **Anonymous users**: Read published content, submit contact forms
- **Authenticated users**: Full CRUD access to all tables

### Key Application Structure

```
app/
├── projects/v3/             # Main project system (Supabase-based)
├── press/                   # Press releases with filtering
├── contact/                 # Contact form with Supabase storage
├── about/                   # Company information
├── process/                 # Process overview
└── layout.tsx              # Root layout with Navigation/Footer

components/
├── TiptapRenderer.tsx      # Renders Tiptap JSON to React
├── Navigation.tsx          # Main navigation with theme toggle
├── ThemeProvider.tsx       # Dark/light theme management
└── navigation/            # Navigation sub-components

lib/
└── supabase.ts           # All Supabase API functions

types/
└── project.types.ts      # TypeScript type definitions
```

## Key Architectural Concepts

### Content Management System
- **Tiptap Editor Integration**: Rich text content stored as JSON in Supabase, rendered with custom `TiptapRenderer` component
- **Version System**: Projects v1/v2 (legacy) → v3 (current Supabase implementation)
- **Server Components**: Heavy use of Next.js server components for data fetching with `revalidate: 60`

### Data Flow Pattern
```typescript
Supabase Database → lib/supabase.ts API functions → Server Components → Client Components
```

### Theme System
- Tailwind CSS with built-in dark mode support
- `ThemeProvider` component manages theme state
- Uses CSS custom properties and `dark:` prefixes

### Type Safety
- Comprehensive TypeScript types in `types/project.types.ts`
- Separate types for Supabase tables vs. legacy data structures
- Tiptap JSON structure typed with `TiptapNode` and `TiptapDocument`

## Important Files to Understand

### Core API Layer (`lib/supabase.ts`)
Central file containing all database interactions:
- `getPublishedProjects()`, `getProject(id)` - Project operations
- `getPublishedPressItems()`, `getPressItem(id)` - Press operations  
- `createContact()`, `getAllContacts()` - Contact form operations
- Proper error handling and type safety throughout

### Content Rendering (`components/TiptapRenderer.tsx`)
Converts Tiptap JSON to React components:
- Supports headings, paragraphs, lists, images, code blocks
- Dark mode styling with Tailwind classes
- Handles rich text marks (bold, italic, links, etc.)

### Type Definitions (`types/project.types.ts`)
- `SupabaseProject`, `SupabasePressItem`, `SupabaseContact` - Main data types
- `TiptapDocument`, `TiptapNode` - Rich text content structure
- Legacy types maintained for compatibility

## Development Guidelines

### Code Style (from .cursor/rules/)
- **TypeScript**: Strict mode, avoid `any`, proper type definitions
- **Components**: Functional components with clear Props interfaces
- **Naming**: camelCase variables, PascalCase components, UPPER_SNAKE_CASE constants
- **File naming**: PascalCase for component files

### Data Fetching Patterns
- Server Components for initial page loads
- `revalidate: 60` for Supabase data (cache for 60 seconds)
- Error boundaries with fallback UI
- Loading states in client components

### Supabase Integration
- All database operations centralized in `lib/supabase.ts`
- RLS policies enforce data access control
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Testing
- Jest configuration with ts-jest
- Test files should follow `*.test.ts` naming convention

## Important Patterns

### Page Structure Pattern
```typescript
// Server Component for data fetching
export const revalidate = 60;

export default async function Page() {
  try {
    const data = await getDataFromSupabase();
    return <ClientComponent data={data} />;
  } catch (error) {
    return <ErrorUI error={error} />;
  }
}
```

### Supabase Query Pattern
```typescript
export async function getTypedData(): Promise<DataType[]> {
  const { data, error } = await supabase
    .from('table')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    throw new Error('User-friendly message');
  }

  return data || [];
}
```

### Component Props Pattern
```typescript
interface ComponentProps {
  data: SupabaseDataType[];
  className?: string;
}

export default function Component({ data, className }: ComponentProps) {
  // Implementation
}
```

This is a mature Next.js application with a well-structured Supabase backend. When making changes, respect the existing patterns, maintain type safety, and ensure proper error handling throughout the data layer.