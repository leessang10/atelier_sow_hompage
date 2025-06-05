'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { Project } from './types';
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div className="max-w-10xl mx-auto" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project: Project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
