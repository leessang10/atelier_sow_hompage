'use client';

import ProjectDetails from './ProjectDetails';
import ProjectImages from './ProjectImages';
import ProjectMainImage from './ProjectMainImage';
import ProjectVideo from './ProjectVideo';
import { projects } from '../projects';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = use(params);
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors">
      <section className="py-2 px-2">
        <div className="max-w-10xl mx-auto mt-16">
          <ProjectMainImage project={project} />

          {project.detail && <ProjectDetails project={project} />}

          {project.video && <ProjectVideo videoId={project.video.videoId} />}

          {project.images && <ProjectImages images={project.images} title={project.title} />}
        </div>
      </section>
    </main>
  );
}
