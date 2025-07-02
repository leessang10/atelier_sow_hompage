'use client';

import { motion } from 'framer-motion';
import { SupabaseProject } from '@/types/project.types';
import ProjectCard from './ProjectCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ProjectGridProps {
  projects: SupabaseProject[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">등록된 프로젝트가 없습니다.</p>
      </div>
    );
  }

  return (
    <motion.div className="max-w-10xl mx-auto" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project: SupabaseProject) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </motion.div>
  );
}
