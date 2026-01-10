'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface DesktopMenuItemProps {
    href: string;
    text: string;
}

export default function DesktopMenuItem({ href, text }: DesktopMenuItemProps) {
    return (
        <Link 
            href={href}
            className="relative group py-2"
        >
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 font-medium">
                {text}
            </span>
            <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 dark:bg-white origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </Link>
    );
} 