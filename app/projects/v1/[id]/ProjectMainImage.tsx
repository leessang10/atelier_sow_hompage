'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectMainImageProps {
    src: string;
    alt: string;
}

export default function ProjectMainImage({ src, alt }: ProjectMainImageProps) {
    return (
        <motion.div
            className="relative aspect-video w-full mb-8 bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
        </motion.div>
    );
} 