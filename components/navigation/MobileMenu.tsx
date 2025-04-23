import {AnimatePresence, motion} from 'framer-motion';
import MobileMenuItem from './MobileMenuItem';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: Array<{ href: string; text: string; }>;
}

export default function MobileMenu({isOpen, onClose, menuItems}: MobileMenuProps) {
    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const closeButtonVariants = {
        closed: {
            rotate: 0,
            scale: 0.5,
            opacity: 0
        },
        open: {
            rotate: 180,
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-white dark:bg-dark-bg z-40 md:hidden"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                >
                    <motion.button
                        className="absolute top-6 right-6 p-2 text-gray-700 dark:text-gray-300"
                        onClick={onClose}
                        variants={closeButtonVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </motion.button>

                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        {menuItems.map((item) => (
                            <MobileMenuItem
                                key={item.href}
                                href={item.href}
                                text={item.text}
                                onClose={onClose}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 