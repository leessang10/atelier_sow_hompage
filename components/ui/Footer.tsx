import { HTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FooterProps extends HTMLAttributes<HTMLElement> {
  variant?: 'simple' | 'detailed';
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, variant = 'simple', ...props }, ref) => {
    const currentYear = new Date().getFullYear();

    if (variant === 'simple') {
      return (
        <footer
          className={cn(
            'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8',
            className
          )}
          ref={ref}
          {...props}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  © {currentYear} SOW Architecture. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <Link 
                  href="/contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
                <Link 
                  href="/press" 
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
                >
                  Press
                </Link>
              </div>
            </div>
          </div>
        </footer>
      );
    }

    return (
      <footer
        className={cn(
          'bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                SOW Architecture
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                건축을 통해 더 나은 세상을 만들어가는 SOW는 
                혁신적이고 지속가능한 디자인 솔루션을 제공합니다.
              </p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>서울특별시 강남구 테헤란로 123, 4층</p>
                <p>Tel: 02-1234-5678</p>
                <p>Email: info@sow-architecture.com</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold text-black dark:text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/projects/v3" 
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/process" 
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
                  >
                    Process
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/press" 
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Services */}
            <div>
              <h4 className="text-base font-semibold text-black dark:text-white mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>건축 설계</li>
                <li>인테리어 디자인</li>
                <li>도시 계획</li>
                <li>컨설팅</li>
              </ul>
              
              <div className="mt-6">
                <h5 className="text-sm font-medium text-black dark:text-white mb-3">
                  Follow Us
                </h5>
                <div className="flex space-x-3">
                  <a 
                    href="https://instagram.com/sow.architecture" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                © {currentYear} SOW Architecture. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs">
                <Link 
                  href="/privacy" 
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export { Footer, type FooterProps };