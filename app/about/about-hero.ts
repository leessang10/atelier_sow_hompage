export const FALLBACK_ABOUT_HERO_IMAGES = [
  'https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/arirang/DSCF6826.webp',
  'https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/pp/DSCF1985.webp',
  'https://ojgtlfcjwlvquikgjlak.supabase.co/storage/v1/object/public/atelier-sow/jjj/DSC03202.webp',
];

export function getAboutHeroImageCandidates(images: string[] = FALLBACK_ABOUT_HERO_IMAGES) {
  const candidates = images.map((image) => image.trim()).filter(Boolean);

  return candidates.length > 0 ? candidates : FALLBACK_ABOUT_HERO_IMAGES;
}

export function pickRandomAboutHeroImage(images: string[], currentImage?: string, random = Math.random) {
  const candidates = getAboutHeroImageCandidates(images);

  if (candidates.length === 1) {
    return candidates[0];
  }

  const randomIndex = Math.floor(random() * candidates.length);
  const nextImage = candidates[randomIndex];

  if (nextImage !== currentImage) {
    return nextImage;
  }

  return candidates[(randomIndex + 1) % candidates.length];
}
