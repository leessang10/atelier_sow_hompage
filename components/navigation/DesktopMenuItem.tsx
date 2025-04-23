import Link from 'next/link';

interface DesktopMenuItemProps {
    href: string;
    text: string;
}

export default function DesktopMenuItem({ href, text }: DesktopMenuItemProps) {
    return (
        <Link 
            href={href}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
            {text}
        </Link>
    );
} 