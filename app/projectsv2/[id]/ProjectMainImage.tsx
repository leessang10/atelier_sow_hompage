'use client';

import { Project } from '@/app/projectsv2/projects';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface ProjectMainImageProps {
  project: Project;
}

export default function ProjectMainImage({ project }: ProjectMainImageProps) {
  return (
    <motion.div
      className="relative aspect-video w-full mb-2 bg-gray-100 dark:bg-gray-800 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image src={project.mainImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
    </motion.div>
  );
}
