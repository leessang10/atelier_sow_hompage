'use client';

import React from 'react';
import { TiptapDocument, TiptapNode } from '@/types/project.types';

interface TiptapRendererProps {
  content: TiptapDocument | TiptapNode;
}

export default function TiptapRenderer({ content }: TiptapRendererProps) {
  const renderNode = (node: TiptapNode, index: number = 0): React.ReactNode => {
    const key = `${node.type}-${index}`;

    switch (node.type) {
      case 'doc':
        return (
          <div key={key} className="tiptap-content">
            {node.content?.map((child, i) => renderNode(child, i))}
          </div>
        );

      case 'paragraph':
        return (
          <p key={key} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {node.content?.map((child, i) => renderNode(child, i))}
          </p>
        );

      case 'heading':
        const level = node.attrs?.level || 1;
        const headingClasses = {
          1: 'text-3xl font-bold mb-6 text-gray-900 dark:text-white',
          2: 'text-2xl font-semibold mb-5 text-gray-900 dark:text-white',
          3: 'text-xl font-semibold mb-4 text-gray-900 dark:text-white',
          4: 'text-lg font-semibold mb-3 text-gray-900 dark:text-white',
          5: 'text-base font-semibold mb-2 text-gray-900 dark:text-white',
          6: 'text-sm font-semibold mb-2 text-gray-900 dark:text-white',
        };

        const className = headingClasses[level as keyof typeof headingClasses];
        const content = node.content?.map((child, i) => renderNode(child, i));

        switch (level) {
          case 1:
            return (
              <h1 key={key} className={className}>
                {content}
              </h1>
            );
          case 2:
            return (
              <h2 key={key} className={className}>
                {content}
              </h2>
            );
          case 3:
            return (
              <h3 key={key} className={className}>
                {content}
              </h3>
            );
          case 4:
            return (
              <h4 key={key} className={className}>
                {content}
              </h4>
            );
          case 5:
            return (
              <h5 key={key} className={className}>
                {content}
              </h5>
            );
          case 6:
            return (
              <h6 key={key} className={className}>
                {content}
              </h6>
            );
          default:
            return (
              <h1 key={key} className={className}>
                {content}
              </h1>
            );
        }

      case 'bulletList':
        return (
          <ul key={key} className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            {node.content?.map((child, i) => renderNode(child, i))}
          </ul>
        );

      case 'orderedList':
        return (
          <ol key={key} className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            {node.content?.map((child, i) => renderNode(child, i))}
          </ol>
        );

      case 'listItem':
        return (
          <li key={key} className="ml-4">
            {node.content?.map((child, i) => renderNode(child, i))}
          </li>
        );

      case 'blockquote':
        return (
          <blockquote key={key} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 mb-4 italic text-gray-700 dark:text-gray-300">
            {node.content?.map((child, i) => renderNode(child, i))}
          </blockquote>
        );

      case 'codeBlock':
        return (
          <pre key={key} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-sm text-gray-800 dark:text-gray-200">{node.content?.map((child, i) => renderNode(child, i))}</code>
          </pre>
        );

      case 'image':
        return (
          <div key={key} className="mb-4">
            <img src={node.attrs?.src} alt={node.attrs?.alt || ''} className="max-w-full h-auto rounded-lg" />
          </div>
        );

      case 'hardBreak':
        return <br key={key} />;

      case 'text':
        let textElement: React.ReactNode = node.text || '';

        // 마크 적용
        if (node.marks) {
          node.marks.forEach((mark) => {
            switch (mark.type) {
              case 'bold':
                textElement = <strong>{textElement}</strong>;
                break;
              case 'italic':
                textElement = <em>{textElement}</em>;
                break;
              case 'underline':
                textElement = <u>{textElement}</u>;
                break;
              case 'strike':
                textElement = <s>{textElement}</s>;
                break;
              case 'code':
                textElement = <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">{textElement}</code>;
                break;
              case 'link':
                textElement = (
                  <a href={mark.attrs?.href} target={mark.attrs?.target} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {textElement}
                  </a>
                );
                break;
            }
          });
        }

        return <span key={key}>{textElement}</span>;

      default:
        // 알 수 없는 노드 타입의 경우 콘텐츠만 렌더링
        return <div key={key}>{node.content?.map((child, i) => renderNode(child, i))}</div>;
    }
  };

  if (!content) {
    return <div className="text-gray-500 dark:text-gray-400">콘텐츠가 없습니다.</div>;
  }

  return <div className="tiptap-content max-w-none">{renderNode(content as TiptapNode)}</div>;
}
