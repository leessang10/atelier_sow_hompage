'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PressItem, NotionBlock } from '../types';

interface PressDetailClientProps {
  pressItem: PressItem;
}

export default function PressDetailClient({ pressItem }: PressDetailClientProps) {
  return (
    <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gray-50 dark:bg-dark-card rounded-lg overflow-hidden shadow-lg">
      {pressItem.thumbnail && (
        <div className="relative h-64 md:h-96 w-full">
          <Image src={pressItem.thumbnail} alt={pressItem.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>{new Date(pressItem.date).toLocaleDateString('ko-KR')}</span>
          <span>|</span>
          <span>{pressItem.source}</span>
          <span>|</span>
          <span className="capitalize">{pressItem.category}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">{pressItem.title}</h1>

        {/* 기본 컨텐츠 */}
        {pressItem.content && pressItem.content.length > 0 && (
          <div className="prose dark:prose-invert max-w-none mb-8">
            {pressItem.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
                    {block.text}
                  </p>
                );
              } else if (block.type === 'heading_1') {
                return (
                  <h2 key={index} className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {block.text}
                  </h2>
                );
              } else if (block.type === 'heading_2') {
                return (
                  <h3 key={index} className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {block.text}
                  </h3>
                );
              } else if (block.type === 'heading_3') {
                return (
                  <h4 key={index} className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    {block.text}
                  </h4>
                );
              } else if (block.type === 'bulleted_list_item') {
                return (
                  <li key={index} className="text-gray-700 dark:text-gray-300 mb-1 ml-4">
                    • {block.text}
                  </li>
                );
              } else if (block.type === 'numbered_list_item') {
                return (
                  <li key={index} className="text-gray-700 dark:text-gray-300 mb-1 ml-4">
                    {index + 1}. {block.text}
                  </li>
                );
              } else if (block.type === 'image' && block.url) {
                return (
                  <div key={index} className="my-6">
                    <Image src={block.url} alt={block.caption || '이미지'} width={800} height={450} className="rounded-lg mx-auto" />
                    {block.caption && <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">{block.caption}</p>}
                  </div>
                );
              } else if (block.type === 'quote') {
                return (
                  <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">
                    {block.text}
                  </blockquote>
                );
              } else if (block.type === 'code') {
                return (
                  <pre key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
                    <code className="text-sm">{block.text}</code>
                  </pre>
                );
              } else if (block.type === 'divider') {
                return <hr key={index} className="my-6 border-gray-200 dark:border-gray-700" />;
              }
              return null;
            })}
          </div>
        )}

        {/* 기본 컨텐츠가 없을 경우 표시 */}
        {(!pressItem.content || pressItem.content.length === 0) && (
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300">컨텐츠가 없습니다.</p>
          </div>
        )}

        {pressItem.link && (
          <div className="mt-6">
            <a href={pressItem.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              원문 보기
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link href="/press" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            보도자료 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
