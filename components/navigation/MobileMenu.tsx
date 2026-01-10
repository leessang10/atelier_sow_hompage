'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: Array<{ href: string; text: string; }>;
}

export default function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
    const containerVariants = {
        hidden: { opacity: 0, x: '100%' },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                staggerChildren: 0.1,
                delayChildren: 0.2
            } 
        },
        exit: { 
            opacity: 0, 
            x: '100%',
            transition: { 
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1
            } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-white/98 dark:bg-dark-bg/98 backdrop-blur-xl z-40 md:hidden flex flex-col h-full pt-28 pb-12 px-8"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                >
                    {/* Background Branding */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0">
                        <h1 className="text-[25vw] font-black text-center leading-none text-gray-900 dark:text-white rotate-90">
                            SOW
                        </h1>
                    </div>

                    {/* Menu Items (Center) */}
                    <nav className="relative z-10 flex-1 flex flex-col justify-center items-center gap-6">
                        {menuItems.map((item) => (
                            <motion.div key={item.href} variants={itemVariants}>
                                <Link 
                                    href={item.href} 
                                    onClick={onClose}
                                    className="text-4xl font-bold text-gray-900 dark:text-white hover:text-gray-400 dark:hover:text-gray-500 transition-colors tracking-tighter"
                                >
                                    {item.text}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Socials & Info (Bottom) */}
                    <motion.div 
                        className="relative z-10 flex flex-col items-center gap-8 mt-auto"
                        variants={itemVariants}
                    >
                        <div className="h-px w-12 bg-gray-200 dark:bg-gray-800" />
                        <div className="flex gap-6">
                            <a href="https://www.instagram.com/ateliersow_official" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.youtube.com/@ateliersow" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors">
                                <FaYoutube size={24} />
                            </a>
                            <a href="https://blog.naver.com/ateliersow" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#03C75A] transition-colors">
                                <SiNaver size={20} />
                            </a>
                        </div>
                        <p className="text-xs text-gray-400 tracking-widest font-light">ATELIER SOW © 2026</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 