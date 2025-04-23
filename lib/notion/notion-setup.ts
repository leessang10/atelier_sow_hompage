import { Client } from '@notionhq/client';

const notion = new Client({
  auth: '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',
});

async function createProjectDatabase(parentPageId: string, databaseName: string) {
  try {
    const response = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: parentPageId
      },
      title: [
        {
          type: "text",
          text: { content: databaseName }
        }
      ],
      properties: {
        // 기본 정보
        Title: {
          title: {}
        },
        Subtitle: {
          rich_text: {}
        },
        Thumbnail: {
          files: {}
        },
        "Created Date": {
          date: {}
        },
        Published: {
          checkbox: {}
        },
      }
    });

    console.log("데이터베이스가 생성되었습니다:", response.id);
    return response.id;
  } catch (error) {
    console.error("데이터베이스 생성 중 오류 발생:", error);
    throw error;
  }
}

// 사용 예시
async function setup() {
    const parentPageId = '1a2512619f9780d694b4e42279d4e849';
    const databaseName = 'News Database';
  // 새 데이터베이스 생성
  await createProjectDatabase(parentPageId, databaseName);
} 

setup();