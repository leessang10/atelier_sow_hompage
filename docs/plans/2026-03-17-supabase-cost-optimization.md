# Supabase Cost Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce public Supabase read volume and payload size for the homepage by shaping queries and increasing cache duration.

**Architecture:** Public read paths in `lib/supabase.ts` will be split into list and detail queries with explicit columns, then wrapped in server-side caching so the same content is reused across pages, metadata, and sitemap generation. Public Next.js pages will use longer revalidation windows because portfolio and press content changes infrequently.

**Tech Stack:** Next.js 15 App Router, TypeScript, Supabase JS, Jest

---

### Task 1: Add the failing test coverage for public Supabase reads

**Files:**
- Create: `__tests__/lib/supabase.test.ts`
- Modify: `package.json`

**Step 1: Write the failing test**

Add tests that mock the Supabase client chain and assert:
- `getPublishedProjects()` selects only lightweight project list columns
- `getProject()` selects detail columns including `body`
- `getPublishedPressItems()` selects only lightweight press list columns
- `getPressItem()` selects detail columns required for metadata and rendering

**Step 2: Run test to verify it fails**

Run: `npx jest __tests__/lib/supabase.test.ts --runInBand`

Expected: FAIL because the current implementation still uses `select('*')` and the project does not yet have the required Jest configuration.

**Step 3: Write minimal implementation**

Add the minimum Jest configuration needed to run the test file and keep the scope limited to Node-based unit tests.

**Step 4: Run test to verify it passes**

Run: `npx jest __tests__/lib/supabase.test.ts --runInBand`

Expected: PASS

**Step 5: Commit**

```bash
git add package.json jest.config.js __tests__/lib/supabase.test.ts
git commit -m "test: cover public supabase query shapes"
```

### Task 2: Reduce public query payloads and add cache wrappers

**Files:**
- Modify: `lib/supabase.ts`

**Step 1: Write the failing test**

Extend the test file to assert the final column selections and cache-safe behavior of the read helpers.

**Step 2: Run test to verify it fails**

Run: `npx jest __tests__/lib/supabase.test.ts --runInBand`

Expected: FAIL because the helper still returns uncached broad queries.

**Step 3: Write minimal implementation**

Update `lib/supabase.ts` to:
- define reusable project and press select lists
- use explicit list/detail queries
- add server cache wrappers for public read helpers only

**Step 4: Run test to verify it passes**

Run: `npx jest __tests__/lib/supabase.test.ts --runInBand`

Expected: PASS

**Step 5: Commit**

```bash
git add lib/supabase.ts __tests__/lib/supabase.test.ts
git commit -m "feat: optimize public supabase reads"
```

### Task 3: Increase cache intervals for public pages and sitemap

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/press/page.tsx`
- Modify: `app/projects/v3/page.tsx`
- Modify: `app/press/[id]/page.tsx`
- Modify: `app/projects/v3/[id]/page.tsx`
- Modify: `app/sitemap.ts`

**Step 1: Write the failing test**

Add a small assertion-based test or static import test that verifies the updated `revalidate` values exported by public routes if practical. If route-level export tests are too costly, verify behavior through code review and targeted build/lint checks instead.

**Step 2: Run test to verify it fails**

Run: `npx jest __tests__/lib/supabase.test.ts --runInBand`

Expected: Existing data-layer tests remain green; route export assertions fail if implemented.

**Step 3: Write minimal implementation**

Increase public route `revalidate` windows to a larger editorially appropriate interval and add route exports where missing on detail pages and sitemap.

**Step 4: Run test to verify it passes**

Run: `npx jest __tests__/lib/supabase.test.ts --runInBand`

Expected: PASS

**Step 5: Commit**

```bash
git add app/page.tsx app/press/page.tsx app/projects/v3/page.tsx app/press/[id]/page.tsx app/projects/v3/[id]/page.tsx app/sitemap.ts
git commit -m "feat: increase public cache windows"
```

### Task 4: Verify the change set

**Files:**
- Modify: none

**Step 1: Run targeted tests**

Run: `npx jest __tests__/lib/supabase.test.ts --runInBand`

Expected: PASS

**Step 2: Run lint**

Run: `npm run lint`

Expected: PASS

**Step 3: Run production build**

Run: `npm run build`

Expected: PASS

**Step 4: Review changed files**

Run: `git diff -- lib/supabase.ts app/page.tsx app/press/page.tsx app/projects/v3/page.tsx app/press/[id]/page.tsx app/projects/v3/[id]/page.tsx app/sitemap.ts __tests__/lib/supabase.test.ts jest.config.js`

Expected: Only public read optimization and cache changes are present.
