'use client';

import {motion} from 'framer-motion';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-dark-card py-16 px-4 transition-colors">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="grid md:grid-cols-2 gap-12"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                >
                    <div>
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Atelier SOW</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">44-78gil, Seochodero, Secho-gu, Seoul, South Korea</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">+82 10 5647-4032</p>
                        <p className="text-gray-600 dark:text-gray-400">sowarch@naver.com</p>
                    </div>
                    <div className="flex flex-col md:items-end justify-center">
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/ateliersow_official"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 border border-gray-100 dark:border-gray-700"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="https://www.youtube.com/@ateliersow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 border border-gray-100 dark:border-gray-700"
                                aria-label="YouTube"
                            >
                                <FaYoutube size={20} />
                            </a>
                            <a
                                href="https://blog.naver.com/ateliersow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300 hover:text-[#03C75A] border border-gray-100 dark:border-gray-700"
                                aria-label="Naver Blog"
                            >
                                <SiNaver size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
} 