import { forwardRef, HTMLAttributes } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PressItem {
  id: number;
  title: string;
  excerpt?: string;
  featured_image?: string;
  publication_date: string;
  category?: string;
  external_url?: string;
  publication_name?: string;
}

interface PressListProps extends HTMLAttributes<HTMLDivElement> {
  items: PressItem[];
  layout?: 'grid' | 'list';
  columns?: 1 | 2 | 3;
  showImages?: boolean;
  showExcerpts?: boolean;
  linkPath?: string;
}

const PressList = forwardRef<HTMLDivElement, PressListProps>(
  ({ 
    className,
    items,
    layout = 'list',
    columns = 2,
    showImages = true,
    showExcerpts = true,
    linkPath = '/press',
    ...props 
  }, ref) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">보도자료가 없습니다.</p>
        </div>
      );
    }

    if (layout === 'grid') {
      return (
        <div
          className={cn(
            'grid gap-6',
            {
              'grid-cols-1': columns === 1,
              'grid-cols-1 md:grid-cols-2': columns === 2,
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
            },
            className
          )}
          ref={ref}
          {...props}
        >
          {items.map((item) => (
            <PressCard
              key={item.id}
              item={item}
              showImage={showImages}
              showExcerpt={showExcerpts}
              linkPath={linkPath}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        className={cn('space-y-6', className)}
        ref={ref}
        {...props}
      >
        {items.map((item) => (
          <PressListItem
            key={item.id}
            item={item}
            showImage={showImages}
            showExcerpt={showExcerpts}
            linkPath={linkPath}
          />
        ))}
      </div>
    );
  }
);

PressList.displayName = 'PressList';

interface PressCardProps {
  item: PressItem;
  showImage: boolean;
  showExcerpt: boolean;
  linkPath: string;
}

function PressCard({ item, showImage, showExcerpt, linkPath }: PressCardProps) {
  const content = (
    <article className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Featured Image */}
      {showImage && item.featured_image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.featured_image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            {item.category && (
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {item.category}
              </span>
            )}
            {item.publication_name && (
              <span>{item.publication_name}</span>
            )}
          </div>
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(item.publication_date).toLocaleDateString('ko-KR')}
          </time>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-black dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {item.title}
        </h3>
        
        {/* Excerpt */}
        {showExcerpt && item.excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {item.excerpt}
          </p>
        )}
      </div>
    </article>
  );

  if (item.external_url) {
    return (
      <a 
        href={item.external_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={`${linkPath}/${item.id}`} className="block">
      {content}
    </Link>
  );
}

interface PressListItemProps {
  item: PressItem;
  showImage: boolean;
  showExcerpt: boolean;
  linkPath: string;
}

function PressListItem({ item, showImage, showExcerpt, linkPath }: PressListItemProps) {
  const content = (
    <article className="group flex gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {/* Featured Image */}
      {showImage && item.featured_image && (
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={item.featured_image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="96px"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            {item.category && (
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {item.category}
              </span>
            )}
            {item.publication_name && (
              <span>{item.publication_name}</span>
            )}
          </div>
          <time className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
            {new Date(item.publication_date).toLocaleDateString('ko-KR')}
          </time>
        </div>
        
        {/* Title */}
        <h3 className="text-base font-semibold text-black dark:text-white mb-1 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {item.title}
        </h3>
        
        {/* Excerpt */}
        {showExcerpt && item.excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {item.excerpt}
          </p>
        )}
      </div>
    </article>
  );

  if (item.external_url) {
    return (
      <a 
        href={item.external_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={`${linkPath}/${item.id}`} className="block">
      {content}
    </Link>
  );
}

export { PressList, type PressListProps, type PressItem };