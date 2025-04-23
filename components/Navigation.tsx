'use client';

import Link from 'next/link';
import { useState } from 'react';
import DesktopMenuItem from './navigation/DesktopMenuItem';
import MobileMenu from './navigation/MobileMenu';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { href: '/about', text: 'About' },
  { href: '/projects', text: 'Projects' },
  { href: '/press', text: 'Press' },
  { href: '/process', text: 'Process' },
  { href: '/contact', text: 'Contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Atelier Sow
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} menuItems={menuItems} />
        </div>
      </div>
    </nav>
  );
}
