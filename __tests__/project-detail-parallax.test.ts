import { getGalleryParallaxRange } from '@/widgets/project-detail/lib/gallery-parallax';

describe('project detail gallery parallax', () => {
  it('uses a clear vertical range for wide images', () => {
    expect(getGalleryParallaxRange({ isWide: true })).toEqual(['-11%', '11%']);
  });

  it('uses a deeper vertical range for portrait images', () => {
    expect(getGalleryParallaxRange({ isWide: false })).toEqual(['-14%', '14%']);
  });
});
