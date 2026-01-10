'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-dark-card pt-20 pb-8 px-4 transition-colors relative overflow-hidden">
            {/* Background Typography */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                <h1 className="text-[15vw] font-black text-center leading-none text-gray-900 dark:text-white whitespace-nowrap">
                    ATELIER SOW
                </h1>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="grid md:grid-cols-12 gap-12 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Brand & Info */}
                    <div className="md:col-span-4 lg:col-span-5 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Atelier SOW</h2>
                        <div className="text-gray-600 dark:text-gray-400 space-y-2 text-sm leading-relaxed">
                            <p>서울특별시 서초구 서초대로 78길 44, 서초나산스위트</p>
                            <p>T. +82 10 5647-4032</p>
                            <p>E. sowarch@naver.com</p>
                        </div>
                    </div>

                    {/* Sitemap */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">Sitemap</h3>
                        <ul className="space-y-3">
                            {['About', 'Projects', 'Press', 'Process', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        href={item === 'Projects' ? '/projects/v3' : `/${item.toLowerCase()}`}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-end h-full">
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/ateliersow_official"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 hover:border-pink-200 transition-all"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={18} />
                            </a>
                            <a
                                href="https://www.youtube.com/@ateliersow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 hover:border-red-200 transition-all"
                                aria-label="YouTube"
                            >
                                <FaYoutube size={18} />
                            </a>
                            <a
                                href="https://blog.naver.com/ateliersow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#03C75A] hover:border-green-200 transition-all"
                                aria-label="Naver Blog"
                            >
                                <SiNaver size={16} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <p>&copy; {currentYear} Atelier SOW. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 