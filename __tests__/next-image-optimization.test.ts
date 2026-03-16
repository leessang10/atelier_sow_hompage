import fs from 'fs';
import path from 'path';

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

  it('adds explicit sizes to the press list image cards', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'app/press/PressClient.tsx'), 'utf8');

    expect(file).toContain('sizes="(max-width: 768px) 100vw, 280px"');
  });

  it('adds explicit sizes to the press detail hero image', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'app/press/[id]/PressDetailClient.tsx'), 'utf8');

    expect(file).toContain('sizes="(max-width: 1024px) 100vw, 896px"');
  });
});
