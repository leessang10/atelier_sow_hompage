'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import DesktopMenuItem from './navigation/DesktopMenuItem';
import MobileMenu from './navigation/MobileMenu';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { href: '/about', text: 'About' },
  { href: '/projects/v3', text: 'Projects' },
  { href: '/press', text: 'Press' },
  { href: '/process', text: 'Process' },
  { href: '/contact', text: 'Contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm h-16' 
          : 'bg-transparent h-24'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Dynamic Logo */}
          <Link href="/" className="relative z-50 group">
             <div className="flex items-center gap-2">
                 <motion.span 
                    initial={false}
                    animate={{ 
                        fontSize: isScrolled ? "1.25rem" : "1.5rem",
                        fontWeight: isScrolled ? 700 : 800 
                    }}
                    className="text-gray-900 dark:text-white tracking-tight transition-colors"
                 >
                    {isScrolled ? "A.SOW" : "Atelier Sow"}
                 </motion.span>
             </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <DesktopMenuItem key={item.href} href={item.href} text={item.text} />
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-gray-900 dark:text-white p-2 focus:outline-none z-50"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                  <motion.span 
                    animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-current origin-left transition-all"
                  />
                  <motion.span 
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-full h-0.5 bg-current transition-all"
                  />
                  <motion.span 
                    animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-current origin-left transition-all"
                  />
              </div>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} menuItems={menuItems} />
        </div>
      </div>

      {/* Reading Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 dark:bg-white origin-left"
        style={{ scaleX }}
      />
    </nav>
  );
}
