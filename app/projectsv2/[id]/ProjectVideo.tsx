'use client';

import {motion} from "framer-motion";

interface ProjectVideoProps {
    videoId: string;
}

export default function ProjectVideo({videoId}: ProjectVideoProps) {
    return (
        <motion.div
            className="relative aspect-video w-full mt-2 mb-2 bg-gray-100 dark:bg-gray-800 overflow-hidden"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.6}}
        >
            <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </motion.div>
    );
}
