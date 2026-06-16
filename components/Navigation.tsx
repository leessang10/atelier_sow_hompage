'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

const menuItems = [
  { href: '/about', text: 'About' },
  { href: '/contact', text: 'Contact' },
];

const projects = [
  { href: '/projects/v3/10', text: 'Cafe Milling' },
  { href: '/projects/v3/9', text: 'Donut Drawing x Crack Crack' },
  { href: '/projects/v3/8', text: 'Booba House' },
  { href: '/projects/v3/7', text: 'Cozimory' },
  { href: '/projects/v3/6', text: 'Jukyo Station' },
  { href: '/projects/v3/4', text: 'Arirang Dowon' },
  { href: '/projects/v3/3', text: 'Pipit Burger' },
  { href: '/projects/v3/2', text: 'Jang Jung Jung' },
  { href: '/projects/v3/1', text: 'Wooadang' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const isHome = pathname === '/';

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openProjects = () => {
    clearCloseTimer();
    setIsProjectsOpen(true);
  };

  const scheduleCloseProjects = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setIsProjectsOpen(false);
    }, 220);
  };

  return (
    <header className="fixed left-1/2 top-6 z-50 -translate-x-1/2 text-white">
      <div className="relative" onMouseEnter={clearCloseTimer} onMouseLeave={scheduleCloseProjects}>
        <div className="rounded-[8px] bg-[rgba(13,14,13,0.9)] px-2 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-md">
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="grid size-10 place-items-center rounded-[5px] font-serif text-lg text-[#b6a27d] transition-colors hover:bg-white/10"
              aria-label="Atelier SOW home"
            >
              S
            </Link>

            <button
              type="button"
              className="h-10 rounded-[5px] px-4 text-[11px] uppercase tracking-[0.16em] text-white/82 transition-colors hover:bg-white/10 hover:text-white"
              onMouseEnter={openProjects}
              onClick={() => setIsProjectsOpen((value) => !value)}
              aria-expanded={isProjectsOpen}
            >
              Projects
            </button>

            <nav className="flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="grid h-10 place-items-center rounded-[5px] px-4 text-[11px] uppercase tracking-[0.16em] text-white/82 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <AnimatePresence>
          {isProjectsOpen ? (
            <motion.div
              className="absolute left-0 right-0 top-full pt-3"
              onMouseEnter={openProjects}
              onMouseLeave={scheduleCloseProjects}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.nav
                className="overflow-hidden rounded-[8px] bg-[rgba(13,14,13,0.9)] text-white shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-md"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                {projects.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-t border-white/8 px-4 py-3 text-[12px] text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                    onClick={() => setIsProjectsOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!isHome ? null : null}
      </div>
    </header>
  );
}
