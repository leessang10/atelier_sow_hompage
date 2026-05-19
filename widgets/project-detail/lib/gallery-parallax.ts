interface GalleryParallaxRangeOptions {
  isWide: boolean;
}

export function getGalleryParallaxRange({ isWide }: GalleryParallaxRangeOptions): [string, string] {
  return isWide ? ['-11%', '11%'] : ['-14%', '14%'];
}
