import { forwardRef, HTMLAttributes } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  subtitle?: string;
  main_image: string;
  year?: string;
  location?: string;
  category?: string;
  area?: string;
}

interface ProjectGridProps extends HTMLAttributes<HTMLDivElement> {
  projects: Project[];
  columns?: 1 | 2 | 3 | 4;
  aspectRatio?: 'square' | '4:3' | '16:9' | '3:2';
  showOverlay?: boolean;
  hoverEffect?: 'lift' | 'scale' | 'fade' | 'none';
  linkPath?: string;
}

const ProjectGrid = forwardRef<HTMLDivElement, ProjectGridProps>(
  ({ 
    className,
    projects,
    columns = 3,
    aspectRatio = '4:3',
    showOverlay = true,
    hoverEffect = 'lift',
    linkPath = '/projects/v3',
    ...props 
  }, ref) => {
    if (projects.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects available</p>
        </div>
      );
    }

    return (
      <div
        className={cn(
          'grid gap-6',
          {
            'grid-cols-1': columns === 1,
            'grid-cols-1 md:grid-cols-2': columns === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': columns === 4,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            aspectRatio={aspectRatio}
            showOverlay={showOverlay}
            hoverEffect={hoverEffect}
            linkPath={linkPath}
          />
        ))}
      </div>
    );
  }
);

ProjectGrid.displayName = 'ProjectGrid';

interface ProjectCardProps {
  project: Project;
  aspectRatio: 'square' | '4:3' | '16:9' | '3:2';
  showOverlay: boolean;
  hoverEffect: 'lift' | 'scale' | 'fade' | 'none';
  linkPath: string;
}

function ProjectCard({ 
  project, 
  aspectRatio, 
  showOverlay, 
  hoverEffect,
  linkPath 
}: ProjectCardProps) {
  const cardContent = (
    <div
      className={cn(
        'relative group overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-300',
        {
          'hover:-translate-y-2 hover:shadow-xl': hoverEffect === 'lift',
          'hover:scale-105': hoverEffect === 'scale',
          'hover:opacity-80': hoverEffect === 'fade',
        }
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          'relative overflow-hidden',
          {
            'aspect-square': aspectRatio === 'square',
            'aspect-[4/3]': aspectRatio === '4:3',
            'aspect-video': aspectRatio === '16:9',
            'aspect-[3/2]': aspectRatio === '3:2',
          }
        )}
      >
        <Image
          src={project.main_image}
          alt={project.title}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            {
              'group-hover:scale-110': hoverEffect !== 'none',
            }
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        {/* Hover Content */}
        {showOverlay && (
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="font-bold text-lg mb-1">{project.title}</h3>
            {project.subtitle && (
              <p className="text-sm opacity-90 mb-2">{project.subtitle}</p>
            )}
            <div className="flex flex-wrap gap-2 text-xs">
              {project.year && (
                <span className="bg-white/20 px-2 py-1 rounded">
                  {project.year}
                </span>
              )}
              {project.location && (
                <span className="bg-white/20 px-2 py-1 rounded">
                  {project.location}
                </span>
              )}
              {project.category && (
                <span className="bg-white/20 px-2 py-1 rounded">
                  {project.category}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Text Content (when overlay is disabled) */}
      {!showOverlay && (
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 text-black dark:text-white">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {project.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-500">
            {project.year && <span>{project.year}</span>}
            {project.location && <span>• {project.location}</span>}
            {project.category && <span>• {project.category}</span>}
            {project.area && <span>• {project.area}</span>}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Link href={`${linkPath}/${project.id}`} className="block">
      {cardContent}
    </Link>
  );
}

export { ProjectGrid, type ProjectGridProps, type Project };