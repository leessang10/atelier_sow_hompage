'use client';

import { getProjectColumnOffset, getProjectRatio, getProjectYear } from '@/entities/project/lib/archive-layout';
import { isSupabaseStorageUrl } from '@/lib/image';
import { cn } from '@/lib/utils';
import { SupabaseProject } from '@/types/project.types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectArchiveCardProps {
  index: number;
  project: SupabaseProject;
}

export function ProjectArchiveCard({ index, project }: ProjectArchiveCardProps) {
  return (
    <motion.article
      className={cn('group relative break-inside-avoid', getProjectColumnOffset(index))}
      initial={{ opacity: 0, y: 56, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
    >
      <Link href={`/projects/v3/${project.id}`} className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950">
        <div className={cn('relative w-full overflow-hidden bg-neutral-100', getProjectRatio(index))}>
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.045 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.main_image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 44vw, 30vw"
              priority={index < 3}
              className="object-cover"
              unoptimized={isSupabaseStorageUrl(project.main_image)}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        </div>

        <div className="mt-3 flex items-start justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-neutral-500">
          <div className="min-w-0">
            <h2 className="truncate text-[13px] font-medium tracking-[0.08em] text-neutral-950">{project.title}</h2>
            {project.subtitle ? <p className="mt-1 truncate normal-case tracking-normal text-neutral-500">{project.subtitle}</p> : null}
          </div>
          <span className="shrink-0 pt-0.5">{getProjectYear(project)}</span>
        </div>
      </Link>
    </motion.article>
  );
}
