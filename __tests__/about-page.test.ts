import fs from 'fs';
import path from 'path';

import {
  FALLBACK_ABOUT_HERO_IMAGES,
  getAboutHeroImageCandidates,
  pickRandomAboutHeroImage,
} from '@/app/about/about-hero';

describe('about page presentation', () => {
  it('labels the about navigation item consistently', () => {
    const navigationFile = fs.readFileSync(path.join(process.cwd(), 'components/Navigation.tsx'), 'utf8');
    const footerFile = fs.readFileSync(path.join(process.cwd(), 'components/Footer.tsx'), 'utf8');

    expect(navigationFile).toContain("{ href: '/about', text: 'About' }");
    expect(navigationFile).not.toContain("{ href: '/about', text: 'Profile' }");
    expect(footerFile).toContain("{ href: '/about', label: 'About' }");
    expect(footerFile).not.toContain("{ href: '/about', label: 'Profile' }");
  });

  it('keeps the about hero label aligned with the menu name', () => {
    const aboutFile = fs.readFileSync(path.join(process.cwd(), 'app/about/page.tsx'), 'utf8');

    expect(aboutFile).toContain('sow-kicker-on-image mb-7">About</p>');
    expect(aboutFile).not.toContain('sow-kicker-on-image mb-7">Profile</p>');
  });

  it('uses project photos as the about hero fallback images', () => {
    expect(FALLBACK_ABOUT_HERO_IMAGES).toEqual(
      expect.arrayContaining([
        expect.stringContaining('/atelier-sow/arirang/'),
        expect.stringContaining('/atelier-sow/pp/'),
        expect.stringContaining('/atelier-sow/jjj/'),
      ])
    );
    expect(FALLBACK_ABOUT_HERO_IMAGES).not.toEqual(
      expect.arrayContaining(['/images/누나매형.jpeg', '/images/매형.jpeg', '/images/누나.jpeg'])
    );
  });

  it('prefers live project images and ignores empty hero candidates', () => {
    expect(getAboutHeroImageCandidates([' /project-a.webp ', '', '   ', '/project-b.webp'])).toEqual(['/project-a.webp', '/project-b.webp']);
  });

  it('picks a different random hero image when multiple project photos exist', () => {
    const candidates = ['/project-a.webp', '/project-b.webp', '/project-c.webp'];

    expect(pickRandomAboutHeroImage(candidates, '/project-a.webp', () => 0)).toBe('/project-b.webp');
  });
});
