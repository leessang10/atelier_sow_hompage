import { forwardRef, HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import TiptapRenderer from '../TiptapRenderer';

interface PressDetailProps extends HTMLAttributes<HTMLDivElement> {
  item: {
    id: number;
    title: string;
    excerpt?: string;
    featured_image?: string;
    publication_date: string;
    category?: string;
    external_url?: string;
    publication_name?: string;
    author?: string;
    content?: any; // Tiptap JSON content
    body?: string; // Plain text content
  };
  layout?: 'full-width' | 'contained';
}

const PressDetail = forwardRef<HTMLDivElement, PressDetailProps>(
  ({ className, item, layout = 'contained', ...props }, ref) => {
    return (
      <article
        className={cn(
          'press-detail',
          {
            'max-w-none': layout === 'full-width',
            'max-w-4xl mx-auto': layout === 'contained',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Article Header */}
        <header className="mb-8 lg:mb-12">
          <div className={cn(layout === 'contained' ? 'px-4' : 'px-4 lg:px-8')}>
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {item.category && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={item.publication_date}>
                  {new Date(item.publication_date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                
                {item.publication_name && (
                  <>
                    <span>•</span>
                    <span>{item.publication_name}</span>
                  </>
                )}
                
                {item.author && (
                  <>
                    <span>•</span>
                    <span>by {item.author}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
              {item.title}
            </h1>
            
            {/* Excerpt */}
            {item.excerpt && (
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {item.excerpt}
              </p>
            )}
            
            {/* External URL Notice */}
            {item.external_url && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  이 기사는 외부 사이트에서 확인하실 수 있습니다.
                </p>
                <a 
                  href={item.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  원문 보기
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {item.featured_image && (
          <section className="mb-8 lg:mb-12">
            <div className={cn(layout === 'contained' ? 'px-4' : '')}>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={item.featured_image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        {(item.content || item.body) && (
          <section className="mb-8 lg:mb-12">
            <div className={cn(layout === 'contained' ? 'px-4' : 'px-4 lg:px-8')}>
              <div className="max-w-none">
                {item.content ? (
                  <TiptapRenderer content={item.content} />
                ) : item.body ? (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        )}

        {/* Article Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className={cn(layout === 'contained' ? 'px-4' : 'px-4 lg:px-8')}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              {/* Publication Info */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.publication_name && (
                  <p>출처: {item.publication_name}</p>
                )}
                <p>
                  발행일: {new Date(item.publication_date).toLocaleDateString('ko-KR')}
                </p>
              </div>
              
              {/* Share Buttons */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">공유:</span>
                
                {/* Twitter */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(item.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                  }}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                
                {/* Facebook */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                  }}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                
                {/* Copy Link */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    // You could add a toast notification here
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Copy link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </article>
    );
  }
);

PressDetail.displayName = 'PressDetail';

export { PressDetail, type PressDetailProps };