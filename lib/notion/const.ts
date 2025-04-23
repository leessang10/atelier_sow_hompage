if (!process.env.NOTION_PROJECT_DATABASE_ID) {
  throw new Error('NOTION_PROJECT_DATABASE_ID is not defined');
}

if (!process.env.NOTION_PRESS_DATABASE_ID) {
  throw new Error('NOTION_PRESS_DATABASE_ID is not defined');
}

if (!process.env.NOTION_CONTACT_DATABASE_ID) {
  throw new Error('NOTION_CONTACT_DATABASE_ID is not defined');
}

export const PROJECT_DATABASE_ID = process.env.NOTION_PROJECT_DATABASE_ID;
export const PRESS_DATABASE_ID = process.env.NOTION_PRESS_DATABASE_ID;
export const CONTACT_DATABASE_ID = process.env.NOTION_CONTACT_DATABASE_ID;
