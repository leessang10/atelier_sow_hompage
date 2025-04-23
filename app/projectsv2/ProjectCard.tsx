import { Project } from './projects';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div variants={item} className="group relative aspect-[4/3] bg-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={project.mainImage}
        alt={project.title}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0">
        <div className="absolute bg-black bg-opacity-40 bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p className="text-sm">{project.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
