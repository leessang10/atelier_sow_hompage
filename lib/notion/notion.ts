import { NotionBlock } from '@/app/press/types';
import { Client } from '@notionhq/client';
import { CONTACT_DATABASE_ID, PRESS_DATABASE_ID, PROJECT_DATABASE_ID } from './const';
import { parseBlock, parsePress, parseProject } from './notion-utils';

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 오류 처리 함수
const handleNotionError = (error: any) => {
  console.error('Notion API 오류:', error);

  // API 토큰이 유효하지 않은 경우
  if (error.code === 'unauthorized' || error.message?.includes('API token is invalid')) {
    console.error('Notion API 토큰이 유효하지 않습니다. 환경 변수를 확인하세요.');
    return [];
  }

  // 기타 오류
  return [];
};

export async function getProjects() {
  try {
    const response = await notion.databases.query({
      database_id: PROJECT_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Order',
          direction: 'ascending',
        },
      ],
    });
    return response.results.map(parseProject);
  } catch (error) {
    return handleNotionError(error);
  }
}

export async function getPressItems() {
  try {
    const response = await notion.databases.query({
      database_id: PRESS_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
    });
    return response.results.map(parsePress);
  } catch (error) {
    return handleNotionError(error);
  }
}

export async function getPressItem(id: string) {
  try {
    // 순차적으로 처리
    const pageResponse = await notion.pages.retrieve({ page_id: id });
    const properties = parsePress(pageResponse);

    // 모든 블록 가져오기
    let allBlocks: any[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const blocksResponse = await notion.blocks.children.list({
        block_id: id,
        start_cursor: startCursor,
      });

      allBlocks = [...allBlocks, ...blocksResponse.results];
      hasMore = blocksResponse.has_more;
      startCursor = blocksResponse.next_cursor || undefined;
    }

    const content = allBlocks.map(parseBlock).filter((block): block is NotionBlock => block !== undefined);

    return {
      ...properties,
      content,
    };
  } catch (error) {
    console.error('Error fetching press item:', error);
    return null;
  }
}

export async function getProject(id: string) {
  try {
    // 순차적으로 처리
    const pageResponse = await notion.pages.retrieve({ page_id: id });
    const properties = parseProject(pageResponse);

    // 모든 블록 가져오기
    let allBlocks: any[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const blocksResponse = await notion.blocks.children.list({
        block_id: id,
        start_cursor: startCursor,
      });

      allBlocks = [...allBlocks, ...blocksResponse.results];
      hasMore = blocksResponse.has_more;
      startCursor = blocksResponse.next_cursor || undefined;
    }

    const content = allBlocks.map(parseBlock).filter((block): block is NotionBlock => block !== undefined);

    return {
      ...properties,
      content,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function createContact(data: { name: string; email: string; phone?: string; message: string }) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: CONTACT_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        Email: {
          email: data.email,
        },
        Phone: {
          phone_number: data.phone || '',
        },
        Message: {
          rich_text: [
            {
              text: {
                content: data.message,
              },
            },
          ],
        },
        Status: {
          select: {
            name: 'New',
          },
        },
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}
