'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Navigation from './Navigation';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const shouldHideFooter = isHome || pathname === '/about' || pathname === '/contact' || pathname.startsWith('/projects/v3/');

  return (
    <>
      <Navigation />
      {children}
      {!shouldHideFooter ? <Footer /> : null}
    </>
  );
}
