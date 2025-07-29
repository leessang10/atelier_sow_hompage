import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Heading Components
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = 'h1', children, ...props }, ref) => {
    const Component = variant;
    
    return (
      <Component
        className={cn(
          'font-bold text-black dark:text-white',
          {
            'text-4xl md:text-5xl lg:text-6xl leading-tight': variant === 'h1',
            'text-3xl md:text-4xl lg:text-5xl leading-tight': variant === 'h2',
            'text-2xl md:text-3xl lg:text-4xl leading-normal': variant === 'h3',
            'text-xl md:text-2xl leading-normal': variant === 'h4',
            'text-lg md:text-xl leading-normal': variant === 'h5',
            'text-base md:text-lg leading-normal': variant === 'h6',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

// Text Components
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'large' | 'medium' | 'small' | 'caption';
  color?: 'primary' | 'secondary' | 'muted';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant = 'medium', color = 'primary', ...props }, ref) => {
    return (
      <p
        className={cn(
          'leading-relaxed',
          // Size variants
          {
            'text-lg': variant === 'large',
            'text-base': variant === 'medium',
            'text-sm': variant === 'small',
            'text-xs': variant === 'caption',
          },
          // Color variants
          {
            'text-black dark:text-white': color === 'primary',
            'text-gray-800 dark:text-gray-200': color === 'secondary',
            'text-gray-600 dark:text-gray-400': color === 'muted',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

// Link Component
interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, external = false, ...props }, ref) => {
    return (
      <a
        className={cn(
          'text-black dark:text-white underline decoration-2 underline-offset-4 hover:decoration-gray-400 transition-colors duration-200',
          className
        )}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        ref={ref}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';

export { Heading, Text, Link, type HeadingProps, type TextProps, type LinkProps };