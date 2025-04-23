'use client';

import {motion} from "framer-motion";
import Image from "next/image";

interface ProjectImagesProps {
    images: string[];
    title: string;
}

export default function ProjectImages({images, title}: ProjectImagesProps) {
    return (
        <motion.div
            className="grid gap-2"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.5}}
        >
            {images.map((image, index) => (
                <div key={index}
                     className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Image
                        src={image}
                        alt={`${title} 이미지 ${index + 1}`}
                        fill
                        style={{objectFit: 'cover', objectPosition: 'center'}}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    />
                </div>
            ))}
        </motion.div>
    );
}
