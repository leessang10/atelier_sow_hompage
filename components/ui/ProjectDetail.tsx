import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ImageSlider } from './ImageSlider';
import TiptapRenderer from '../TiptapRenderer';

interface ProjectDetailProps extends HTMLAttributes<HTMLDivElement> {
  project: {
    id: number;
    title: string;
    subtitle?: string;
    year?: string;
    location?: string;
    category?: string;
    area?: string;
    client?: string;
    architect?: string;
    images: {
      src: string;
      alt: string;
      caption?: string;
    }[];
    content?: any; // Tiptap JSON content
    description?: string;
  };
  layout?: 'full-width' | 'contained';
}

const ProjectDetail = forwardRef<HTMLDivElement, ProjectDetailProps>(
  ({ className, project, layout = 'contained', ...props }, ref) => {
    return (
      <article
        className={cn(
          'project-detail',
          {
            'max-w-none': layout === 'full-width',
            'max-w-6xl mx-auto': layout === 'contained',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Project Header */}
        <header className="mb-8 lg:mb-12">
          <div className={cn(layout === 'contained' ? 'px-4' : 'px-4 lg:px-8')}>
            <h1 className="text-3xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              {project.title}
            </h1>
            
            {project.subtitle && (
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6">
                {project.subtitle}
              </p>
            )}
            
            {/* Project Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.year && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Year
                  </dt>
                  <dd className="text-base text-black dark:text-white">
                    {project.year}
                  </dd>
                </div>
              )}
              
              {project.location && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Location
                  </dt>
                  <dd className="text-base text-black dark:text-white">
                    {project.location}
                  </dd>
                </div>
              )}
              
              {project.category && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Program
                  </dt>
                  <dd className="text-base text-black dark:text-white">
                    {project.category}
                  </dd>
                </div>
              )}
              
              {project.area && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Area
                  </dt>
                  <dd className="text-base text-black dark:text-white">
                    {project.area}
                  </dd>
                </div>
              )}
              
              {project.client && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Client
                  </dt>
                  <dd className="text-base text-black dark:text-white">
                    {project.client}
                  </dd>
                </div>
              )}
              
              {project.architect && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Architect
                  </dt>
                  <dd className="text-base text-black dark:text-white">
                    {project.architect}
                  </dd>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <section className="mb-8 lg:mb-12">
            <div className={cn(layout === 'contained' ? 'px-4' : '')}>
              <ImageSlider
                images={project.images}
                aspectRatio="16:9"
                showThumbnails={project.images.length > 1}
                showDots={project.images.length > 1}
                showArrows={project.images.length > 1}
                className="mb-6"
              />
            </div>
          </section>
        )}

        {/* Project Description/Content */}
        {(project.content || project.description) && (
          <section className="mb-8 lg:mb-12">
            <div className={cn(layout === 'contained' ? 'px-4' : 'px-4 lg:px-8')}>
              <div className="max-w-4xl">
                {project.content ? (
                  <TiptapRenderer content={project.content} />
                ) : project.description ? (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        )}
      </article>
    );
  }
);

ProjectDetail.displayName = 'ProjectDetail';

export { ProjectDetail, type ProjectDetailProps };