import fs from 'fs';
import path from 'path';
import { isSupabaseStorageUrl } from '@/lib/image';

describe('next image optimization configuration', () => {
  it('sets a minimum cache ttl for remote images', () => {
    const nextConfig = require('../next.config.ts');
    const config = nextConfig.default || nextConfig;

    expect(config.images.minimumCacheTTL).toBe(3600);
  });

  it('keeps the Supabase storage remote pattern enabled', () => {
    const nextConfig = require('../next.config.ts');
    const config = nextConfig.default || nextConfig;

    expect(config.images.remotePatterns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          hostname: '**.supabase.co',
          pathname: '/storage/v1/object/public/**',
        }),
      ])
    );
  });

  it('detects Supabase storage URLs for optimization bypass', () => {
    expect(isSupabaseStorageUrl('https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/projects/test.jpg')).toBe(true);
    expect(isSupabaseStorageUrl('https://example.com/image.jpg')).toBe(false);
    expect(isSupabaseStorageUrl(undefined)).toBe(false);
  });

  it('adds explicit sizes to the press list image cards', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'app/press/PressClient.tsx'), 'utf8');

    expect(file).toContain('sizes="(max-width: 768px) 100vw, 280px"');
  });

  it('adds explicit sizes to the press detail hero image', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'app/press/[id]/PressDetailClient.tsx'), 'utf8');

    expect(file).toContain('sizes="(max-width: 1024px) 100vw, 896px"');
  });

  it('keeps homepage slider images constrained to the viewport width', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'components/ProjectSlider.tsx'), 'utf8');

    expect(file).toContain('sizes="100vw"');
    expect(file).toContain('priority={index === 0}');
  });

  it('adds explicit sizes to the project detail hero image', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'app/projects/v3/[id]/page.tsx'), 'utf8');

    expect(file).toContain('sizes="100vw"');
  });

  it('uses a tighter sizes hint for project cards', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'app/projects/v3/ProjectCard.tsx'), 'utf8');

    expect(file).toContain('sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"');
  });

  it('bypasses Vercel optimization for Supabase project slider images', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'components/ProjectSlider.tsx'), 'utf8');

    expect(file).toContain('unoptimized={isSupabaseStorageUrl(project.main_image)}');
  });

  it('bypasses Vercel optimization for Supabase press images', () => {
    const listFile = fs.readFileSync(path.join(process.cwd(), 'app/press/PressClient.tsx'), 'utf8');
    const detailFile = fs.readFileSync(path.join(process.cwd(), 'app/press/[id]/PressDetailClient.tsx'), 'utf8');

    expect(listFile).toContain('unoptimized={isSupabaseStorageUrl(item.main_image)}');
    expect(detailFile).toContain('unoptimized={isSupabaseStorageUrl(pressItem.main_image)}');
  });
});
