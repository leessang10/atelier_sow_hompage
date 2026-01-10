'use client';

import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

export default function ProjectSocials() {
  return (
    <div className="flex flex-col gap-4">
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
        href="https://www.threads.net/@atelier__sow"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-100 dark:border-gray-700"
        aria-label="Threads"
      >
        <FaThreads size={20} />
      </a>
    </div>
  );
}
