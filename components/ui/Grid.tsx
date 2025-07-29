import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = 'md', responsive = true, ...props }, ref) => {
    return (
      <div
        className={cn(
          'grid',
          // Grid columns
          {
            'grid-cols-1': cols === 1,
            'grid-cols-1 md:grid-cols-2': cols === 2 && responsive,
            'grid-cols-2': cols === 2 && !responsive,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3 && responsive,
            'grid-cols-3': cols === 3 && !responsive,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4 && responsive,
            'grid-cols-4': cols === 4 && !responsive,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6': cols === 6 && responsive,
            'grid-cols-6': cols === 6 && !responsive,
            'grid-cols-12': cols === 12,
          },
          // Gap sizes
          {
            'gap-2': gap === 'sm',
            'gap-4': gap === 'md',
            'gap-6': gap === 'lg',
            'gap-8': gap === 'xl',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';

const GridItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

GridItem.displayName = 'GridItem';

export { Grid, GridItem, type GridProps };