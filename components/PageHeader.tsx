'use client';

import {motion} from "framer-motion";

export default function PageHeader({title, description}: { title: string; description?: string }) {
    return (
        <div className="bg-gray-50 dark:bg-dark-card py-20 px-4 flex items-center transition-colors">
            <motion.div
                className="max-w-7xl mx-auto text-center mt-8"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2, duration: 0.6}}
                >
                    {title}
                </motion.h1>
                {description && (
                    <motion.p
                        className="text-xl text-gray-600 dark:text-gray-400"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4, duration: 0.6}}
                    >
                        {description}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
} 