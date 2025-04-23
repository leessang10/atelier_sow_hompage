import { NotionBlock } from '@/app/press/types';

// 노션 프로퍼티 파싱 유틸리티 함수들
export function parseProperty(property: any) {
  if (!property) return null;

  switch (property.type) {
    case 'title':
      return property.title[0]?.plain_text || null;
    case 'rich_text':
      return property.rich_text[0]?.plain_text || null;
    case 'date':
      return property.date?.start || null;
    case 'files':
      return property.files.map((file: any) => file.file?.url || file.external?.url);
    case 'checkbox':
      return property.checkbox;
    default:
      return null;
  }
}

// 블록 내용 파싱 함수
export function parseBlock(block: any): NotionBlock | undefined {
  if (!block) return undefined;

  switch (block.type) {
    case 'paragraph': {
      const texts = block.paragraph.rich_text;

      // 링크가 있는지 확인
      const hasLink = texts.some((text: any) => text.text.link);
      if (hasLink) {
        const text = texts[0];
        return {
          type: 'link_preview',
          text: text.plain_text || '',
          url: text.text.link.url,
          caption: text.plain_text || '', // 링크 텍스트를 캡션으로 사용
        };
      }

      // 일반 텍스트인 경우
      return {
        type: 'paragraph',
        text: texts.map((text: any) => text.plain_text).join(''),
      };
    }
    case 'heading_1':
      return {
        type: 'heading_1',
        text: block.heading_1.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'heading_2':
      return {
        type: 'heading_2',
        text: block.heading_2.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'heading_3':
      return {
        type: 'heading_3',
        text: block.heading_3.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'bulleted_list_item':
      return {
        type: 'bulleted_list_item',
        text: block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'numbered_list_item':
      return {
        type: 'numbered_list_item',
        text: block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'to_do':
      return {
        type: 'to_do',
        text: block.to_do.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'toggle':
      return {
        type: 'toggle',
        text: block.toggle.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'callout':
      return {
        type: 'callout',
        text: block.callout.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'quote':
      return {
        type: 'quote',
        text: block.quote.rich_text.map((text: any) => text.plain_text).join(''),
      };
    case 'image':
      return {
        type: 'image',
        text: '',
        url: block.image.file?.url || block.image.external?.url,
        caption: block.image.caption?.map((text: any) => text.plain_text).join('') || '',
      };
    case 'link_preview':
      return {
        type: 'link_preview',
        text: '',
        url: block.link_preview.url,
      };
    case 'bookmark':
      return {
        type: 'bookmark',
        text: '',
        url: block.bookmark.url,
        caption: block.bookmark.caption?.map((text: any) => text.plain_text).join('') || '',
      };
    default:
      return undefined;
  }
}

// 프로젝트 데이터 파싱 함수
export function parseProject(page: any) {
  const properties = page.properties;

  return {
    id: page.id,
    title: parseProperty(properties.Title),
    subtitle: parseProperty(properties.Subtitle),
    mainImage: parseProperty(properties['Main Image'])?.[0],
    createdDate: parseProperty(properties['Created Date']),
    published: parseProperty(properties.Published),
  };
}

// 보도자료 데이터 파싱 함수
export function parsePress(page: any) {
  const properties = page.properties;

  return {
    id: page.id,
    title: parseProperty(properties.Title),
    content: parseProperty(properties.Content),
    date: parseProperty(properties.Date),
    source: parseProperty(properties.Source),
    category: parseProperty(properties.Category),
    thumbnail: parseProperty(properties.Thumbnail)?.[0],
    link: parseProperty(properties.Link),
  };
}
