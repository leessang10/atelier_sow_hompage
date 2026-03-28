# Supabase Cost Optimization Design

**Problem**

The public homepage currently fetches Supabase data directly for list pages, detail pages, and sitemap generation. Most queries use `select('*')`, which transfers more data than necessary. The current `revalidate = 60` setting also causes frequent repeated reads for content that changes rarely.

**Goal**

Reduce repeated Supabase reads and response payload size for public content without changing the visible behavior of the site.

**Approach Options**

## Option 1: Query shaping and longer page cache

- Replace `select('*')` with explicit column lists for each public query.
- Split project and press list/detail queries so list pages avoid loading rich `body` content.
- Increase page revalidation windows for public pages and sitemap.

**Pros**

- Low risk
- Immediate Supabase read and egress reduction
- No infrastructure change

**Cons**

- Does not address image egress
- Keeps Supabase as origin for public content

## Option 2: Add application-level cache wrappers

- Introduce Next.js cache wrappers around Supabase fetchers in addition to query shaping.
- Reuse cached results across page render paths and metadata generation.

**Pros**

- Better deduplication inside the app
- Reduces repeated fetches from metadata and page rendering paths

**Cons**

- Slightly more code and testing surface
- Must be careful not to cache contact mutations

## Option 3: Move public content out of Supabase hot path

- Mirror public content into static files or Vercel Blob and rebuild on publish.

**Pros**

- Largest long-term DB read reduction

**Cons**

- Higher complexity
- Requires admin publishing flow changes

**Recommendation**

Start with Option 2 plus the query shaping from Option 1. This keeps the current architecture, reduces payload size, and deduplicates repeated list/detail fetches across pages, metadata, and sitemap generation.

**Design**

## Data access

- Keep mutations unchanged.
- Add explicit select lists for project list, project detail, press list, and press detail queries.
- Add cached read helpers for public project and press reads.

## Page caching

- Increase public page `revalidate` values from `60` to a higher interval suitable for infrequently changing editorial content.
- Apply the same cache posture to sitemap generation.

## Error handling

- Preserve the current user-facing fallback UI.
- Keep detailed errors on the server side only.

## Testing

- Add focused tests around the public Supabase helper module.
- Verify list queries do not request heavy columns such as `body`.
- Verify detail queries still request the fields required for metadata and detail rendering.

**Non-goals**

- No storage migration
- No image pipeline redesign
- No admin-side query changes in this pass
