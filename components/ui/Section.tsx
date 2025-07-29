import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'dark';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'lg', background = 'white', ...props }, ref) => {
    return (
      <section
        className={cn(
          // Spacing
          {
            'py-8': spacing === 'sm',
            'py-16': spacing === 'md',
            'py-24': spacing === 'lg',
            'py-32': spacing === 'xl',
          },
          // Background
          {
            'bg-white dark:bg-gray-900': background === 'white',
            'bg-gray-50 dark:bg-gray-800': background === 'gray',
            'bg-gray-900 dark:bg-black': background === 'dark',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

export { Section, type SectionProps };