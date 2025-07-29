import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroSectionProps extends HTMLAttributes<HTMLElement> {
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  centered?: boolean;
  height?: 'screen' | 'half' | 'large' | 'medium';
  parallax?: boolean;
  children?: ReactNode;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  ({ 
    className, 
    backgroundImage, 
    overlay = false, 
    overlayOpacity = 30,
    centered = true, 
    height = 'screen',
    parallax = false,
    style, 
    children,
    ...props 
  }, ref) => {
    return (
      <section
        className={cn(
          'relative w-full overflow-hidden',
          {
            'min-h-screen': height === 'screen',
            'min-h-[50vh]': height === 'half',
            'min-h-[75vh]': height === 'large',
            'min-h-[60vh]': height === 'medium',
            'flex items-center justify-center': centered,
          },
          className
        )}
        style={style}
        ref={ref}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className={cn(
              'absolute inset-0 z-0',
              {
                'transform scale-110': parallax, // Slightly larger for parallax effect
              }
            )}
          >
            <Image
              src={backgroundImage}
              alt="Hero background"
              fill
              className={cn(
                'object-cover',
                {
                  'transition-transform duration-1000 ease-out': parallax,
                }
              )}
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* Overlay */}
        {overlay && backgroundImage && (
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(
                135deg, 
                rgba(0, 0, 0, ${overlayOpacity / 100}) 0%, 
                rgba(0, 0, 0, ${(overlayOpacity - 10) / 100}) 100%
              )`
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-20 w-full">
          {children}
        </div>

        {/* Scroll indicator */}
        {height === 'screen' && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        )}
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export { HeroSection, type HeroSectionProps };