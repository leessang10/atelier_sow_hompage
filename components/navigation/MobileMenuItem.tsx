import Link from 'next/link';

interface MobileMenuItemProps {
    href: string;
    text: string;
    onClose: () => void;
}

export default function MobileMenuItem({href, text, onClose}: MobileMenuItemProps) {
    return (
        <Link
            href={href}
            onClick={onClose}
            className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
            {text}
        </Link>
    );
} 