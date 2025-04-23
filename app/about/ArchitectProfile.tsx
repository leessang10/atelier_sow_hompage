import { motion } from "framer-motion";
import Image from "next/image";

interface ArchitectProfileProps {
    name: string;
    image: string;
    role: string;
}

export default function ArchitectProfile({ name, image, role }: ArchitectProfileProps) {
    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                    src={image}
                    alt={`${name} 대표`}
                    fill
                    className="object-cover"
                    style={{
                        transform: image.includes('매형') ? "scale(2.5)" : "none",
                        objectPosition: image.includes('매형') ? "50% 45%" : "center",
                    }}
                />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{role}</p>
        </motion.div>
    );
} 